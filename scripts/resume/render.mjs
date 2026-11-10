#!/usr/bin/env node
/**
 * Render resume/resume.html to the site's downloadable PDF (US Letter) with headless Chromium.
 *   node scripts/resume/render.mjs [out=public/Corey_Paskewitz_Resume.pdf]
 *   node scripts/resume/render.mjs --with-phone <out.pdf>   (private copy, includes the phone number)
 * The public copy on the site never includes the phone number.
 */
import { chromium } from '@playwright/test';
import { resolve } from 'node:path';

const args = process.argv.slice(2);
const withPhone = args.includes('--with-phone');
const out = args.find((a) => !a.startsWith('--')) ?? 'public/Corey_Paskewitz_Resume.pdf';
if (withPhone && resolve(out).includes('/public/')) {
  console.error('Refusing to write the phone-number copy into public/.');
  process.exit(1);
}
const browser = await chromium.launch();
const page = await browser.newPage();
await page.goto('file://' + resolve('resume/resume.html'));
if (withPhone) await page.evaluate(() => document.body.classList.add('with-phone'));
await page.pdf({ path: out, format: 'Letter', preferCSSPageSize: true, printBackground: true, tagged: true, outline: true });
const pages = await page.evaluate(() => Math.ceil(document.body.scrollHeight / (11 * 96 - 1.1 * 96)));
await browser.close();
console.log(`wrote ${out} (~${pages} page(s))`);
