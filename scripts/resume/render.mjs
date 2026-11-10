#!/usr/bin/env node
/**
 * Render resume/resume.html to the site's downloadable PDF (US Letter) with headless Chromium.
 *   node scripts/resume/render.mjs [out=public/Corey_Paskewitz_Resume.pdf]
 */
import { chromium } from '@playwright/test';
import { resolve } from 'node:path';

const out = process.argv[2] ?? 'public/Corey_Paskewitz_Resume.pdf';
const browser = await chromium.launch();
const page = await browser.newPage();
await page.goto('file://' + resolve('resume/resume.html'));
await page.pdf({ path: out, format: 'Letter', preferCSSPageSize: true, printBackground: true, tagged: true, outline: true });
const pages = await page.evaluate(() => Math.ceil(document.body.scrollHeight / (11 * 96 - 1.1 * 96)));
await browser.close();
console.log(`wrote ${out} (~${pages} page(s))`);
