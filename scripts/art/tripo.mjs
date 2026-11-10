#!/usr/bin/env node
/**
 * Image → 3D with the Tripo API (dev-time only; never runs on the site).
 *
 *   node scripts/art/tripo.mjs --image art/drafts/raven-concept-3.png --out art/source/raven.glb \
 *     [--model <model_version>] [--faces 15000] [--quad false] [--texture-quality standard] [--seed 7]
 *   node scripts/art/tripo.mjs --balance
 *
 * Needs TRIPO_API_KEY in the environment (~/.zshenv). Prints the balance before and the
 * credits consumed after, and appends each run to art/drafts/tripo-log.jsonl.
 * Failed or cancelled tasks are not charged by Tripo.
 */
import { readFile, writeFile, mkdir, appendFile } from 'node:fs/promises';
import { basename, dirname, join } from 'node:path';

// tsk_ keys belong to the v2 platform (api.tripo3d.ai); the v3 host rejects them.
const BASE = 'https://api.tripo3d.ai/v2/openapi';
const key = process.env.TRIPO_API_KEY;
if (!key) {
  console.error('TRIPO_API_KEY is not set (add it to ~/.zshenv).');
  process.exit(1);
}
const auth = { Authorization: `Bearer ${key}` };

const args = process.argv.slice(2);
const opts = { faces: '15000', quad: 'false', 'texture-quality': 'standard' };
for (let i = 0; i < args.length; i++) {
  const name = args[i].replace(/^--/, '');
  if (name === 'balance') opts.balance = true;
  else opts[name] = args[++i];
}

async function api(path, init = {}) {
  const res = await fetch(`${BASE}${path}`, { ...init, headers: { ...auth, ...(init.headers ?? {}) } });
  const json = await res.json().catch(() => ({}));
  if (!res.ok || json.code !== 0) {
    throw new Error(`Tripo ${path} → HTTP ${res.status}: ${JSON.stringify(json)}`);
  }
  return json.data;
}

const balance = async () => api('/user/balance');

if (opts.balance) {
  console.log(await balance());
  process.exit(0);
}
if (!opts.image || !opts.out) {
  console.error('Usage: tripo.mjs --image <png> --out <glb> [options]   |   tripo.mjs --balance');
  process.exit(1);
}

const before = await balance();
console.log('balance before:', before);

// 1. Upload the concept image.
const form = new FormData();
form.append('file', new Blob([await readFile(opts.image)], { type: 'image/png' }), basename(opts.image));
const { image_token: file_token } = await api('/upload', { method: 'POST', body: form });

// 2. Start the task.
const body = {
  type: 'image_to_model',
  file: { type: 'png', file_token },
  ...(opts.model ? { model_version: opts.model } : {}),
  face_limit: Number(opts.faces),
  texture: true,
  pbr: true,
  texture_quality: opts['texture-quality'],
  ...(opts.quad === 'true' ? { quad: true } : {}),
  ...(opts.seed ? { model_seed: Number(opts.seed) } : {}),
};
const { task_id } = await api('/task', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(body),
});
console.log('task', task_id, body);

// 3. Poll (bounded: 15 minutes).
let task;
const started = Date.now();
for (;;) {
  task = await api(`/task/${task_id}`);
  process.stdout.write(`\r${task.status} ${task.progress ?? ''}%   `);
  if (['success', 'failed', 'cancelled', 'banned', 'expired'].includes(task.status)) break;
  if (Date.now() - started > 15 * 60_000) throw new Error('Timed out waiting for Tripo task ' + task_id);
  await new Promise((r) => setTimeout(r, 5000));
}
console.log();
if (task.status !== 'success') {
  console.error('Task ended with', task.status, task.error_code ?? '', task.error_message ?? '');
  process.exit(1);
}

// 4. Download the model and its preview render.
await mkdir(dirname(opts.out), { recursive: true });
const download = async (url, file) => {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Download failed ${res.status} for ${file}`);
  await writeFile(file, Buffer.from(await res.arrayBuffer()));
  return file;
};
const modelUrl = task.output.pbr_model ?? task.output.model ?? task.output.base_model;
await download(modelUrl, opts.out);
if (task.output.rendered_image) {
  await download(task.output.rendered_image, opts.out.replace(/\.glb$/, '-render.webp'));
}

const after = await balance();
console.log('credits consumed:', task.consumed_credit ?? task.credits_consumed, '| balance after:', after);
await mkdir('art/drafts', { recursive: true });
await appendFile(
  join('art/drafts', 'tripo-log.jsonl'),
  JSON.stringify({ at: new Date().toISOString(), task_id, body: { ...body, file: opts.image }, credits: task.consumed_credit ?? task.credits_consumed, out: opts.out }) + '\n',
);
console.log('saved', opts.out);
