const playwright = require('/Users/harshchaurasiya/.npm/_npx/705bc6b22212b352/node_modules/playwright');
const path = require('path');

async function run() {
  const browser = await playwright.chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1440, height: 900 });

  const localUrl = 'http://localhost:3000';
  const outDir = '/Users/harshchaurasiya/.gemini/antigravity/brain/071bb78a-ea5b-4061-b2d6-d07390fadf35';

  // 1. Header (Home page load)
  console.log("Navigating to home page...");
  await page.goto(localUrl, { waitUntil: 'networkidle', timeout: 30000 });
  console.log("Capturing Header section at 1440x900 viewport...");
  const header = await page.$('header');
  if (header) {
    await header.screenshot({ path: path.join(outDir, 'verify_prompt24_1_header.png') });
    console.log("Saved Header screenshot.");
  }

  // 2. Virtual meeting page right panel
  console.log("Navigating to /virtual-meeting...");
  await page.goto(`${localUrl}/virtual-meeting`, { waitUntil: 'networkidle', timeout: 30000 });
  console.log("Capturing Virtual Meeting page right panel / whole page...");
  await page.screenshot({ path: path.join(outDir, 'verify_prompt24_2_virtual_meeting.png'), fullPage: true });
  console.log("Saved Virtual Meeting page screenshot.");

  await browser.close();
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
