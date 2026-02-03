# Playwright Automation Tests

This repository contains **Playwright tests** demonstrating automated testing of web applications.

---

## Features

- **Authentication Tests**
  - Basic Auth, Digest Auth & Form Auth
  - Positive (correct credentials) and negative (wrong credentials) scenarios

- **JS Alert Tests**
  - Detect and handle different JS alerts dialogs
  - Test acceptance and dismissal scenarios
  - Verify result messages after user interaction

- **Reusable Helpers**

---

## How to Run

1. Install dependencies:

```bash
npm install
npx playwright install
```

2. Run all tests:
```bash
npx playwright test
```

3. Run a specific test file:
```bash
npx playwright test tests/login.spec.ts
```
