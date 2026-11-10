#!/usr/bin/env node
/**
 * axe-core WCAG 2.1 A/AA scan at desktop and phone size, with and without reduced motion.
 *
 *   node scripts/qa/axe.mjs [baseUrl=http://localhost:4173]
 *
 * Exits 1 when any violation is found.
 */
import { chromium } from '@playwright/test';
import { readFile } from 'node:fs/promises';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const axeSource = await readFile(require.resolve('axe-core/axe.min.js'), 'utf8');
const base = process.argv.find((a) => a.startsWith('http')) ?? 'http://localhost:4173';

const runs = [
  { name: 'desktop', width: 1440, height: 900, reducedMotion: 'reduce' },
  { name: 'desktop+motion', width: 1440, height: 900, reducedMotion: 'no-preference' },
  { name: 'phone', width: 393, height: 852, isMobile: true, hasTouch: true, reducedMotion: 'reduce' },
  { name: 'phone+motion', width: 393, height: 852, isMobile: true, hasTouch: true, reducedMotion: 'no-preference' },
];

const browser = await chromium.launch();
let total = 0;
for (const r of runs) {
  const ctx = await browser.newContext({
    viewport: { width: r.width, height: r.height },
    isMobile: r.isMobile,
    hasTouch: r.hasTouch,
    reducedMotion: r.reducedMotion,
  });
  const page = await ctx.newPage();
  await page.goto(base, { waitUntil: 'networkidle' });
  // Scroll through so lazy content and scroll-driven states render, then settle at the top.
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += window.innerHeight / 2) {
      window.scrollTo(0, y);
      await new Promise((res) => setTimeout(res, 120));
    }
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(2500);
  await page.addScriptTag({ content: axeSource });
  const result = await page.evaluate(async () =>
    // eslint-disable-next-line no-undef
    axe.run(document, { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'] } })
  );
  total += result.violations.length;
  console.log(`\n[${r.name}] ${result.violations.length} violations, ${result.passes.length} passes`);
  for (const v of result.violations) {
    console.log(`  ${v.id} (${v.impact}): ${v.help}`);
    v.nodes.slice(0, 5).forEach((n) => console.log(`    ${n.target.join(' ')} :: ${n.failureSummary?.split('\n')[1] ?? ''}`));
  }
  await ctx.close();
}
await browser.close();
process.exit(total ? 1 : 0);
