const playwright = require('/Users/harshchaurasiya/.npm/_npx/705bc6b22212b352/node_modules/playwright');
const path = require('path');

async function run() {
  const browser = await playwright.chromium.launch({ headless: true });
  const outDir = '/Users/harshchaurasiya/.gemini/antigravity/brain/071bb78a-ea5b-4061-b2d6-d07390fadf35';
  const localUrl = 'http://localhost:3000';

  // 1. Viewport 1280px width
  const context1280 = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const page1280 = await context1280.newPage();
  console.log("Navigating to home page at 1280px viewport...");
  await page1280.goto(localUrl, { waitUntil: 'networkidle', timeout: 30000 });
  
  // Verify no horizontal overflow
  const hasScrollbar1280 = await page1280.evaluate(() => {
    return document.documentElement.scrollWidth > document.documentElement.clientWidth;
  });
  console.log(`Has horizontal scrollbar at 1280px: ${hasScrollbar1280}`);
  await page1280.screenshot({ path: path.join(outDir, 'verify_prompt25_1_1280.png') });
  await context1280.close();

  // 2. Viewport 1440px width
  const context1440 = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page1440 = await context1440.newPage();
  console.log("Navigating to home page at 1440px viewport...");
  await page1440.goto(localUrl, { waitUntil: 'networkidle', timeout: 30000 });
  const hasScrollbar1440 = await page1440.evaluate(() => {
    return document.documentElement.scrollWidth > document.documentElement.clientWidth;
  });
  console.log(`Has horizontal scrollbar at 1440px: ${hasScrollbar1440}`);
  await page1440.screenshot({ path: path.join(outDir, 'verify_prompt25_2_1440.png') });

  // 3. Stats Band after animation completes
  console.log("Scrolling to Stats Band...");
  const statsBand = await page1440.$('section:has-text("Crore")');
  if (statsBand) {
    await statsBand.scrollIntoViewIfNeeded();
    console.log("Waiting 3 seconds for animation to complete...");
    await page1440.waitForTimeout(3000);
    await statsBand.screenshot({ path: path.join(outDir, 'verify_prompt25_3_stats.png') });
    console.log("Saved stats screenshot.");
  } else {
    // fallback
    console.log("Stats band not found, taking page screenshot instead.");
    await page1440.evaluate(() => window.scrollTo(0, 1000));
    await page1440.waitForTimeout(3000);
    await page1440.screenshot({ path: path.join(outDir, 'verify_prompt25_3_stats.png') });
  }

  await context1440.close();
  await browser.close();
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
