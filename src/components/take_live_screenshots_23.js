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
  console.log("Capturing live Header...");
  const header = await page.$('header');
  if (header) {
    await header.screenshot({ path: path.join(outDir, 'live_prompt23_1_header.png') });
    console.log("Saved live Header screenshot.");
  }

  // 2. Homepage Hero
  console.log("Capturing live Hero section...");
  const heroSection = await page.$('section:has-text("Your Financial Future")');
  if (heroSection) {
    await heroSection.screenshot({ path: path.join(outDir, 'live_prompt23_2_hero.png') });
    console.log("Saved live Hero screenshot.");
  }

  // 3. Virtual meeting page
  console.log("Navigating to live /virtual-meeting...");
  await page.goto(`${liveUrl}/virtual-meeting`, { waitUntil: 'networkidle', timeout: 30000 });
  await page.screenshot({ path: path.join(outDir, 'live_prompt23_3_virtual_meeting.png'), fullPage: true });
  console.log("Saved live Virtual Meeting page screenshot.");

  // 4. Get in Touch section on Home page
  console.log("Navigating back to live home...");
  await page.goto(liveUrl, { waitUntil: 'networkidle', timeout: 30000 });
  const contactSection = await page.$('h2:has-text("Get in")');
  if (contactSection) {
    await contactSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000);
    await page.screenshot({ path: path.join(outDir, 'live_prompt23_4_contact.png') });
    console.log("Saved live Contact section screenshot.");
  }

  // 5. Floating widget on Home page
  console.log("Scrolling up slightly to showcase live floating widget...");
  await page.evaluate(() => window.scrollTo(0, 500));
  await page.waitForTimeout(1000);
  await page.screenshot({ path: path.join(outDir, 'live_prompt23_5_floating.png') });
  console.log("Saved live Floating Widget screenshot.");

  // 6. Our Story page showing Floating widget
  console.log("Navigating to live /our-story...");
  await page.goto(`${liveUrl}/our-story`, { waitUntil: 'networkidle', timeout: 30000 });
  await page.evaluate(() => window.scrollTo(0, 300));
  await page.waitForTimeout(1000);
  await page.screenshot({ path: path.join(outDir, 'live_prompt23_6_our_story.png') });
  console.log("Saved live Our Story page floating widget screenshot.");

  // 7. Calculators page showing Floating widget
  console.log("Navigating to live /calculators...");
  await page.goto(`${liveUrl}/calculators`, { waitUntil: 'networkidle', timeout: 30000 });
  await page.evaluate(() => window.scrollTo(0, 300));
  await page.waitForTimeout(1000);
  await page.screenshot({ path: path.join(outDir, 'live_prompt23_7_calculators.png') });
  console.log("Saved live Calculators page floating widget screenshot.");

  await browser.close();
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
