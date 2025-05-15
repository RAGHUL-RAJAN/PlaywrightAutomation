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
  reporter: "html",
  project: [
    {
      name: 'safari',
      use: {
        browserName: "webkit",
        headless: true,
        screenshot: "off",
        trace: "on",
        ...devices['iPhone 11'],
      }
    },
    {
      name: "chrome",
      use: {
        browserName: "chromium",
        headless: false,
        screenshot: "on",
        trace: "on",
        viewport : {width :720,height:720}
      }
    }
  ]


};

module.exports = config;
