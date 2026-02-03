import { Page, Dialog, test, expect } from '@playwright/test';
const jsAlertPageURL = 'https://the-internet.herokuapp.com/javascript_alerts';

/**
 * Waits for a JS alert to appear after performing an action,
 * but does NOT accept or dismiss it.
 *
 * @param page Playwright Page object
 * @param action Function that triggers the alert
 */
async function expectAlert(page: Page, action: () => Promise<void>): Promise<Dialog> {
  return new Promise<Dialog>((resolve, reject) => {
    let alertAppeared = false;

    page.once('dialog', (dialog: Dialog) => {
      alertAppeared = true;
      resolve(dialog); // return the dialog so caller can accept/dismiss
    });

    action().catch(reject);

    setTimeout(() => {
      if (!alertAppeared) reject(new Error('Expected alert did not appear'));
    }, 3000); // timeout to catch missing alert
  });
};

test('JSAlert_ClickBtnJSAlert_ShowsResultSuccess', async ({ page }) => {
  await page.goto(jsAlertPageURL);

  const dialog = await expectAlert(page, async () => {
    await page.getByRole('button', { name: 'Click for JS Alert' }).click(); // triggers alert
  });

  // Assert the JS alert type
  const dialogType = dialog.type().toString();
  await expect(dialogType).toEqual('alert');

  // Accept the alert
  await dialog.accept();

  await expect(page.locator('#result')).toHaveText('You successfully clicked an alert');
});

test('JSAlert_ClickBtnJSConfirm_ShowsResultOK', async ({ page }) => {
  await page.goto(jsAlertPageURL);

  const dialog = await expectAlert(page, async () => {
    await page.getByRole('button', { name: 'Click for JS Confirm' }).click(); // triggers alert
  });

  // Assert the JS alert type
  const dialogType = dialog.type().toString();
  await expect(dialogType).toEqual('confirm');

  // Accept the alert
  await dialog.accept();

  await expect(page.locator('#result')).toHaveText('You clicked: Ok');
});

test('JSAlert_ClickBtnJSConfirm_ShowsResultCancel', async ({ page }) => {
  await page.goto(jsAlertPageURL);

  const dialog = await expectAlert(page, async () => {
    await page.getByRole('button', { name: 'Click for JS Confirm' }).click(); // triggers alert
  });

  // Assert the JS alert type
  const dialogType = dialog.type().toString();
  await expect(dialogType).toEqual('confirm');

  // Accept the alert
  await dialog.dismiss();

  await expect(page.locator('#result')).toHaveText('You clicked: Cancel');
});

test('JSAlert_ClickBtnJSPrompt&Entered_ShowsEnteredText', async ({ page }) => {
  const enteredText = 'No problem';

  await page.goto(jsAlertPageURL);

  const dialog = await expectAlert(page, async () => {
    await page.getByRole('button', { name: 'Click for JS Prompt' }).click(); // triggers alert
  });

  // Assert the JS alert type
  const dialogType = dialog.type().toString();
  await expect(dialogType).toEqual('prompt');

  // Accept the alert
  await dialog.accept(enteredText);

  await expect(page.locator('#result')).toHaveText(`You entered:  ${enteredText}`);
});

test('JSAlert_ClickBtnJSPrompt&Cancel_ShowsNullText', async ({ page }) => {

  await page.goto(jsAlertPageURL);

  const dialog = await expectAlert(page, async () => {
    await page.getByRole('button', { name: 'Click for JS Prompt' }).click(); // triggers alert
  });

  // Assert the JS alert type
  const dialogType = dialog.type().toString();
  await expect(dialogType).toEqual('prompt');

  // Accept the alert
  await dialog.dismiss();

  await expect(page.locator('#result')).toHaveText(`You entered: null`);
});