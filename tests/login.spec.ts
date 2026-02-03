import { test, expect } from '@playwright/test';
import { CREDENTIALS } from './constants';
const loginSuccessLocator = 'text=Congratulations! You must have the proper credentials.';

test('Login(BasicAuth)_EnterCorrectCred_LoginSuccess', async ({ browser }) => {
  const context = await browser.newContext({
    httpCredentials: {
      username: CREDENTIALS.USERNAME,
      password: CREDENTIALS.PASSWORD,
    },
  });

  const page = await context.newPage();
  await page.goto('https://the-internet.herokuapp.com/basic_auth');

  await expect(page.locator(loginSuccessLocator)).toBeVisible();
});

test('Login(DigestAuth)_EnterCorrectCred_LoginSuccess', async ({ browser }) => {
  const context = await browser.newContext({
    httpCredentials: {
      username: CREDENTIALS.USERNAME,
      password: CREDENTIALS.PASSWORD,
    },
  });

  const page = await context.newPage();
  await page.goto('https://the-internet.herokuapp.com/digest_auth');

  await expect(page.locator(loginSuccessLocator)).toBeVisible();
});

test('Login(BasicAuth)_EnterWrongCred_LoginFailed', async ({ browser }) => {
  const context = await browser.newContext({
    httpCredentials: {
      username: CREDENTIALS.USERNAME,
      password: 'asdf',
    },
  });

  const page = await context.newPage();
  await page.goto('https://the-internet.herokuapp.com/basic_auth');

  await expect(page.locator(loginSuccessLocator)).toHaveCount(0);
});

test('Login(DigestAuth)_EnterWrongCred_LoginFailed', async ({ browserName, browser }) => {
  test.skip(browserName === 'firefox', 'Firefox does not return HTTP 401 for wrong digest auth');

  const context = await browser.newContext({
    httpCredentials: {
      username: CREDENTIALS.USERNAME,
      password: 'asdf',
    },
  });

  const page = await context.newPage();
  await page.goto('https://the-internet.herokuapp.com/digest_auth');

  await expect(page.locator(loginSuccessLocator)).toHaveCount(0);
});