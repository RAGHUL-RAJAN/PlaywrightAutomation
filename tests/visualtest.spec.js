const { test, expect } = require("@playwright/test");

test('visual test', async ({ page }) => {

    await page.goto("https://www.google.com/");
    expect(await page.screenshot()).toMatchSnapshot('landing.png');

})