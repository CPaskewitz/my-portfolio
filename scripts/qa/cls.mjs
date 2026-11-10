#!/usr/bin/env node
/** Log every layout shift and the nodes that moved (phone + desktop, 4x CPU throttle). node scripts/qa/cls.mjs [url] */
import { chromium } from '@playwright/test';
const base = process.argv[2] ?? 'http://localhost:4173';
const b = await chromium.launch();
for (const vp of [{ w: 393, h: 852, m: true }, { w: 1440, h: 900, m: false }]) {
  const ctx = await b.newContext({ viewport: { width: vp.w, height: vp.h }, isMobile: vp.m, hasTouch: vp.m });
  const page = await ctx.newPage();
  const cdp = await ctx.newCDPSession(page);
  await cdp.send('Emulation.setCPUThrottlingRate', { rate: 4 });
  await page.addInitScript(() => {
    window.__shifts = [];
    new PerformanceObserver((l) => {
      for (const e of l.getEntries()) {
        if (e.hadRecentInput) continue;
        window.__shifts.push({ t: Math.round(e.startTime), v: +e.value.toFixed(4), src: e.sources.map((s) => {
          const n = s.node; const d = n && n.nodeType === 1 ? n : n?.parentElement;
          return `${d ? d.tagName.toLowerCase() + (d.className && typeof d.className === 'string' ? '.' + d.className.split(' ')[0] : '') : '?'} ${JSON.stringify([s.previousRect.y, s.currentRect.y, s.previousRect.height, s.currentRect.height])}`;
        }) });
      }
    }).observe({ type: 'layout-shift', buffered: true });
  });
  await page.goto(base, { waitUntil: 'networkidle' });
  await page.waitForTimeout(4000);
  console.log(vp.w, JSON.stringify(await page.evaluate(() => window.__shifts), null, 1));
  await ctx.close();
}
await b.close();
