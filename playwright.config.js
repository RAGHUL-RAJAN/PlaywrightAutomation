// @ts-check
import { defineConfig, devices } from "@playwright/test";
import { trace } from "console";

/**
 * @see https://playwright.dev/docs/test-configuration
 */

const config = {
  testDir: "./tests",
  timeout: 30 * 1000,
  expect: {
    timeout: 3000,
  },
  // reporter: "html",
  reporter: [
    ['list'],                   // Console output
    ['html', { outputFolder: 'html-report' }],  // Playwright HTML report
    ['allure-playwright']       // Allure results
  ],

  use: {
    browserName: "chromium",
    headless: false,
    screenshot: "on",
    trace: "retain-on-failure",
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
  },
};

module.exports = config;
