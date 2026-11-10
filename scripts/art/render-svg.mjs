#!/usr/bin/env node
/**
 * Rasterise an SVG to PNG with headless Chromium (logo previews, favicons, social card).
 *   node scripts/art/render-svg.mjs <in.svg|in.html> <out.png> [width] [height]
 */
import { chromium } from '@playwright/test';
import { resolve } from 'node:path';
const [, , input, out, w = '256', h] = process.argv;
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: +w, height: +(h ?? w) } });
await p.goto('file://' + resolve(input));
await p.waitForTimeout(300);
await p.screenshot({ path: out, omitBackground: true });
await b.close();
