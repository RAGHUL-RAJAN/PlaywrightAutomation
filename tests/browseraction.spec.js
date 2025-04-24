const { test, expect } = require("@playwright/test");

test("Browser actions", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
  await page.pause();
  await page.goto("https://rahulshettyacademy.com/client");
  await page.goBack();
  await page.goForward();
});

test("Hidden fields",async({page})=>{
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/")
    await page.locator("#displayed-text").isVisible();
    await page.locator("#show-textbox").click();
    await expect(page.locator("#displayed-text")).toBeHidden();
})

test("validating pop-up",async({page})=>{
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await page.pause();
    page.on('dialog',dialog => dialog.accept());
    await page.locator("#confirmbtn").click();
})

test.only("Screenshot & Visual comparision",async({page})=>{
  await page.goto("https://rahulshettyacademy.com/AutomationPractice/")
  await page.locator("#displayed-text").toBeVisible();
  await page.locator("#hide-textbox").click();
  await page.screenshot({path: 'screenshot.png'})
  await expect(page.locator("#displayed-text")).toBeHidden();
})
