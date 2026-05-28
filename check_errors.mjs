import { chromium } from 'playwright';
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();
await page.setViewportSize({ width: 390, height: 844 });
await page.goto('http://localhost:5173/daily_food_nutrient/');
await page.waitForLoadState('networkidle');
await page.screenshot({ path: '/tmp/new_form.png', fullPage: true });
await browser.close();
process.exit(0);
