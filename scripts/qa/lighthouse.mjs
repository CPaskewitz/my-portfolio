#!/usr/bin/env node
/**
 * Lighthouse 12 mobile + desktop summary.
 *
 *   node scripts/qa/lighthouse.mjs [baseUrl=http://localhost:4173] [label=after]
 *
 * Full JSON reports go to qa-output/lighthouse-<label>-<form>.json.
 */
import { execFileSync } from 'node:child_process';
import { mkdirSync, readFileSync } from 'node:fs';

const base = process.argv.find((a) => a.startsWith('http')) ?? 'http://localhost:4173';
const label = process.argv.slice(2).find((a) => !a.startsWith('http')) ?? 'after';
mkdirSync('qa-output', { recursive: true });

for (const form of ['mobile', 'desktop']) {
  const out = `qa-output/lighthouse-${label}-${form}.json`;
  const args = ['-y', 'lighthouse@12.2.1', base, '--quiet', '--chrome-flags=--headless=new', '--output=json', `--output-path=${out}`];
  if (form === 'desktop') args.push('--preset=desktop');
  execFileSync('npx', args, { stdio: 'ignore' });
  const r = JSON.parse(readFileSync(out, 'utf8'));
  const cats = Object.values(r.categories).map((c) => `${c.id} ${Math.round(c.score * 100)}`).join(' · ');
  const a = r.audits;
  console.log(
    `${form.padEnd(8)} ${cats} | LCP ${a['largest-contentful-paint'].displayValue} · CLS ${a['cumulative-layout-shift'].displayValue} · TBT ${a['total-blocking-time'].displayValue} · ${a['total-byte-weight'].displayValue}`
  );
}
