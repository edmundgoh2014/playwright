/**
 * Interface defining the structure of each test case.
 * This ensures every scenario has the required fields.
 */
export interface AlertTestCase {
  name: string;
  buttonName: string;
  expectedType: 'alert' | 'confirm' | 'prompt';
  action: 'accept' | 'dismiss';
  inputValue?: string; // Optional: only needed for prompts
  expectedResult: string;
}

export const alertTestData: AlertTestCase[] = [
  {
    name: 'JSAlert_ClickBtnJSAlert_ShowsResultSuccess',
    buttonName: 'Click for JS Alert',
    expectedType: 'alert',
    action: 'accept',
    expectedResult: 'You successfully clicked an alert',
  },
  {
    name: 'JSAlert_ClickBtnJSConfirm_ShowsResultOK',
    buttonName: 'Click for JS Confirm',
    expectedType: 'confirm',
    action: 'accept',
    expectedResult: 'You clicked: Ok',
  },
  {
    name: 'JSAlert_ClickBtnJSConfirm_ShowsResultCancel',
    buttonName: 'Click for JS Confirm',
    expectedType: 'confirm',
    action: 'dismiss',
    expectedResult: 'You clicked: Cancel',
  },
  {
    name: 'JSAlert_ClickBtnJSPrompt&Entered_ShowsEnteredText',
    buttonName: 'Click for JS Prompt',
    expectedType: 'prompt',
    action: 'accept',
    inputValue: 'No problem',
    expectedResult: 'You entered:  No problem',
  },
  {
    name: 'JSAlert_ClickBtnJSPrompt&Cancel_ShowsNullText',
    buttonName: 'Click for JS Prompt',
    expectedType: 'prompt',
    action: 'dismiss',
    expectedResult: 'You entered: null',
  },
];