const { expect, test } = require("@playwright/test");

test("playwright special locators", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/angularpractice/");

  await page.locator("[name*='name']").first().fill("Jack");
  await page
    .locator("[name*='email']")
    .first()
    .fill("Jacksparrow007@gmail.com");
  await page.getByPlaceholder("Password").fill("Qwerty@123");
  await page.getByLabel("Check me out if you Love IceCreams!").check();
  await page.getByLabel("Gender").selectOption("Male");
  await page.getByLabel("Employed").click();
  await page.getByRole("button", { name: "Submit" }).click();
  await page
    .getByText(" The Form has been submitted successfully!.")
    .isVisible();
  await page.getByRole("link", { name: 'Shop' }).click();
//   await page.locator("app-card").waitFor();
  await page
    .locator("app-card")
    .filter({ hasText: "Nokia Edge" })
    .getByRole("button",{name : 'Add'})
    .click();

    await page.pause();
    
});
