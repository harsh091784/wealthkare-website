const playwright = require('/Users/harshchaurasiya/.npm/_npx/705bc6b22212b352/node_modules/playwright');
const path = require('path');

async function run() {
  const browser = await playwright.chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1440, height: 900 });

  const liveUrl = 'https://wealthkare-website.vercel.app';
  const outDir = '/Users/harshchaurasiya/.gemini/antigravity/brain/071bb78a-ea5b-4061-b2d6-d07390fadf35';

  // 1. Header (Home page load)
  console.log("Navigating to live home page...");
  await page.goto(liveUrl, { waitUntil: 'networkidle', timeout: 30000 });
  console.log("Capturing live Header at 1440x900 viewport...");
  const header = await page.$('header');
  if (header) {
    await header.screenshot({ path: path.join(outDir, 'live_prompt24_1_header.png') });
    console.log("Saved live Header screenshot.");
  }

  // 2. Virtual meeting page
  console.log("Navigating to live /virtual-meeting...");
  await page.goto(`${liveUrl}/virtual-meeting`, { waitUntil: 'networkidle', timeout: 30000 });
  console.log("Capturing live Virtual Meeting page right panel...");
  await page.screenshot({ path: path.join(outDir, 'live_prompt24_2_virtual_meeting.png'), fullPage: true });
  console.log("Saved live Virtual Meeting page screenshot.");

  await browser.close();
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
