#!/usr/bin/env node
/**
 * Screenshot every section at desktop and phone size, and report console errors,
 * page errors and failed requests.
 *
 *   npm run build && npx vite preview --port 4173 &
 *   node scripts/qa/shots.mjs [baseUrl=http://localhost:4173] [--motion]
 *
 * Output: qa-output/shots/<viewport>-<section>.png (+ full page). By default runs with
 * reduced motion so the boot overlay and reveals don't hide content; pass --motion to see
 * the animated state.
 */
import { chromium } from '@playwright/test';
import { mkdir } from 'node:fs/promises';

const base = process.argv.find((a) => a.startsWith('http')) ?? 'http://localhost:4173';
const motion = process.argv.includes('--motion');
const out = 'qa-output/shots';
await mkdir(out, { recursive: true });

const viewports = [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'phone', width: 393, height: 852, isMobile: true, hasTouch: true },
];
const sections = ['top', 'profile', 'capabilities', 'projects', 'corvian-labs', 'contact', 'footer'];

const browser = await chromium.launch();
let problems = 0;
for (const vp of viewports) {
  const ctx = await browser.newContext({
    viewport: { width: vp.width, height: vp.height },
    isMobile: vp.isMobile,
    hasTouch: vp.hasTouch,
    reducedMotion: motion ? 'no-preference' : 'reduce',
    deviceScaleFactor: 1,
  });
  const page = await ctx.newPage();
  const log = [];
  page.on('console', (m) => m.type() === 'error' && log.push(`console: ${m.text()}`));
  page.on('pageerror', (e) => log.push(`pageerror: ${e.message}`));
  page.on('requestfailed', (r) => log.push(`failed: ${r.url()} ${r.failure()?.errorText}`));
  page.on('response', (r) => r.status() >= 400 && log.push(`http ${r.status()}: ${r.url()}`));

  await page.goto(base, { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  if (overflow > 0) log.push(`horizontal overflow: ${overflow}px`);
  const height = await page.evaluate(() => document.documentElement.scrollHeight);

  for (const id of sections) {
    if (id === 'top') await page.evaluate(() => window.scrollTo(0, 0));
    else if (id === 'footer') await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    else await page.evaluate((s) => document.getElementById(s)?.scrollIntoView({ block: 'start' }), id);
    await page.waitForTimeout(700);
    await page.screenshot({ path: `${out}/${vp.name}-${id}.png` });
  }
  await page.screenshot({ path: `${out}/${vp.name}-full.png`, fullPage: true });

  console.log(`\n[${vp.name}] page height ${height}px`);
  if (log.length) {
    problems += log.length;
    log.forEach((l) => console.log('  ' + l));
  } else console.log('  no console errors, page errors or failed requests');
  await ctx.close();
}
await browser.close();
console.log(`\nScreenshots in ${out}/`);
process.exit(problems ? 1 : 0);
