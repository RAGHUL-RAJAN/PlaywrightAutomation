const { test, expect } = require("@playwright/test");

test("Handling iFrames", async ({ page }) => {
  page.goto("https://rahulshettyacademy.com/AutomationPractice/");
  const frames = page.frameLocator("#courses-iframe");
  await frames.locator("li a[href*='lifetime-access']:visible").click();
//   above locator only focus on visible element
  const textcontent = await frames.locator(".text h2").textContent();
  console.log(textcontent.split(" ")[1]);
});
