import { chromium } from 'playwright';

const browser = await chromium.launch({ headless: false, slowMo: 100 });
const page = await browser.newPage();

// GitHub classic token 발급 페이지 (repo + workflow 스코프 pre-select)
await page.goto('https://github.com/login');
console.log('Waiting for login...');

// 로그인 완료 대기 (최대 60초)
await page.waitForURL('https://github.com/', { timeout: 60000 }).catch(() => {});
console.log('Logged in, navigating to token page...');

await page.goto('https://github.com/settings/tokens/new?scopes=repo,workflow&description=daily_food_nutrient_deploy');
await page.waitForLoadState('networkidle');
await page.screenshot({ path: '/tmp/token_page.png' });
console.log('Token page ready. Generate the token and I will capture it.');

// Generate token 버튼 클릭
await page.locator('input[type="submit"][value*="Generate"]').click();
await page.waitForLoadState('networkidle');
await page.screenshot({ path: '/tmp/token_generated.png' });

// 토큰 값 캡처
const token = await page.locator('.js-newly-generated-token, #new-oauth-token, [data-target="oauth-token-value.token"]').first().textContent().catch(() => null)
  ?? await page.locator('code').first().textContent().catch(() => null);

console.log('TOKEN:', token?.trim());
await browser.close();
