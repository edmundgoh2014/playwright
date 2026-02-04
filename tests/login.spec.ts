import { test, expect, type Browser, type Page} from '@playwright/test';

import { loginTestData, type LoginTestCase } from '../testData/loginTestData.ts';

for (const scenario of loginTestData) {
  test(scenario.name, async ({ browser, browserName }) => {
    // 1. Setup
    if (scenario.skipFirefox && browserName === 'firefox') test.skip();
    
    // Create the page based on auth type
    const page = await createAuthPage(browser, scenario);

    // 2. Action (Only for Form Auth)
    if (scenario.authType === 'form') {
      await performFormLogin(page, scenario);
    }

    // 3. Validation
    await verifyLoginResult(page, scenario);
  });
}

async function createAuthPage(browser: Browser, scenario: LoginTestCase) {
  if (scenario.authType === 'http') {
    const context = await browser.newContext({
      httpCredentials: { username: scenario.username, password: scenario.password }
    });
    const page = await context.newPage();
    await page.goto(scenario.path);
    return page;
  }
  
  const page = await browser.newPage();
  await page.goto(scenario.path);
  return page;
}

async function performFormLogin(page: Page, scenario: LoginTestCase) {
  await page.getByLabel('username').fill(scenario.username);
  await page.getByLabel('password').fill(scenario.password);
  await page.locator('button[type="submit"]').click();
}

async function verifyLoginResult(page: Page, scenario: LoginTestCase) {
  // if authType is 'http' then locator is 'text=...', else locator is '#flash'
  const locator = scenario.authType === 'http' ? 'text=Congratulations!' : '#flash';
  
  if (scenario.isSuccess) {
    await expect(page.locator(locator)).toContainText(scenario.expectedMessage);
  } else {
    if (scenario.authType === 'http') {
      await expect(page.locator(locator)).toHaveCount(0);
    } else {
      await expect(page.locator(locator)).toContainText(scenario.expectedMessage);
    }
  }
}