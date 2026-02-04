import { type Page, type Dialog, test, expect } from '@playwright/test';
import { alertTestData, type AlertTestCase } from '../testData/jsAlertTestData.ts';
import { testURL } from './constants.ts';

const jsAlertPageURL = `${testURL}/javascript_alerts`;

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

for (const scenario of alertTestData as AlertTestCase[]) {
  test(scenario.name, async ({ page }) => {
    await page.goto(jsAlertPageURL);

    const dialog = await expectAlert(page, async () => {
      await page.getByRole('button', { name: scenario.buttonName }).click();
    });

    // Assert type
    expect(dialog.type()).toBe(scenario.expectedType);

    // Handle Dialog
    if (scenario.action === 'accept') {
      await dialog.accept(scenario.inputValue);
    } else {
      await dialog.dismiss();
    }

    // Assert Result
    await expect(page.locator('#result')).toHaveText(scenario.expectedResult);
  });
};