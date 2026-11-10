#!/usr/bin/env node
/**
 * Generate an image with the OpenAI Images API (dev-time only; never runs on the site).
 *
 *   node scripts/art/imagegen.mjs --out art/drafts/feather.png --prompt "..." \
 *     [--model gpt-image-1.5] [--size 1024x1536] [--quality low|medium|high] \
 *     [--background transparent|opaque|auto] [--n 1] [--ref path.png ...]
 *
 * With --ref, the reference image(s) go to the edits endpoint so a new image can keep
 * the subject/style of an existing one (e.g. a Blender render).
 * Needs OPENAI_API_KEY in the environment (set in ~/.zshenv). Every call is appended to
 * art/drafts/imagegen-log.jsonl with its prompt and token usage, so spend stays traceable.
 */
import { readFile, writeFile, mkdir, appendFile } from 'node:fs/promises';
import { dirname, basename, extname, join } from 'node:path';

const args = process.argv.slice(2);
const opts = { model: 'gpt-image-1.5', size: '1024x1024', quality: 'medium', background: 'auto', n: '1', ref: [] };
for (let i = 0; i < args.length; i++) {
  const key = args[i].replace(/^--/, '');
  const value = args[++i];
  if (key === 'ref') opts.ref.push(value);
  else opts[key] = value;
}
if (!opts.out || !opts.prompt) {
  console.error('Usage: imagegen.mjs --out <file.png> --prompt "<text>" [options]');
  process.exit(1);
}
const apiKey = process.env.OPENAI_API_KEY;
if (!apiKey) {
  console.error('OPENAI_API_KEY is not set (add it to ~/.zshenv).');
  process.exit(1);
}

const common = {
  model: opts.model,
  prompt: opts.prompt,
  size: opts.size,
  quality: opts.quality,
  background: opts.background,
  n: Number(opts.n),
};

let response;
if (opts.ref.length) {
  const form = new FormData();
  for (const [k, v] of Object.entries(common)) form.append(k, String(v));
  for (const path of opts.ref) {
    const type = extname(path) === '.webp' ? 'image/webp' : extname(path) === '.jpg' ? 'image/jpeg' : 'image/png';
    form.append('image[]', new Blob([await readFile(path)], { type }), basename(path));
  }
  response = await fetch('https://api.openai.com/v1/images/edits', {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}` },
    body: form,
  });
} else {
  response = await fetch('https://api.openai.com/v1/images/generations', {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(common),
  });
}

const json = await response.json();
if (!response.ok) {
  console.error(`OpenAI error ${response.status}:`, json.error?.message ?? json);
  process.exit(1);
}

await mkdir(dirname(opts.out), { recursive: true });
const written = [];
for (const [i, item] of json.data.entries()) {
  const file = json.data.length > 1 ? opts.out.replace(/(\.\w+)$/, `-${i + 1}$1`) : opts.out;
  await writeFile(file, Buffer.from(item.b64_json, 'base64'));
  written.push(file);
}

const logDir = join(process.cwd(), 'art/drafts');
await mkdir(logDir, { recursive: true });
await appendFile(
  join(logDir, 'imagegen-log.jsonl'),
  JSON.stringify({ at: new Date().toISOString(), ...common, ref: opts.ref, files: written, usage: json.usage }) + '\n',
);
console.log(written.join('\n'));
if (json.usage) console.log('usage:', JSON.stringify(json.usage));
