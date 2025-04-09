const { test, expect } = require("@playwright/test");

test("Addto Carts", async ({ page }) => {
  const products = page.locator(".card-body");
  const email = "jacksparrow007@gmail.com";
  const productName = "ZARA COAT 3";
  const password = "Qwerty@123";

  await page.goto("https://rahulshettyacademy.com/client");
  await page.getByPlaceholder("email@example.com").fill(email);
  await page.getByPlaceholder("enter your passsword").fill(password);
  await page.getByRole("button", { name: "Login" }).click();
  await page.waitForLoadState("networkidle");
  await page.locator(".card-body b").first().waitFor();

  await products
    .filter({ hasText: "ZARA COAT 3" })
    .getByRole("button", { name: "Add to Cart" })
    .click();
  await page
    .getByRole("listitem")
    .getByRole("button", { name: "Cart" })
    .click();

  await page.locator("div li").first().waitFor();
  await expect(page.getByText("ZARA COAT 3")).toBeVisible();

  await page.getByRole("button", { name: "Buy Now" }).click();

  await page.getByPlaceholder("Select Country").pressSequentially("ind");

  await page.getByRole("button",{name :'india'}).nth(1).click();

  // await page.pause();
  await page.getByText("Place Order").click();

  await expect(page.getByText("Thankyou for the order.")).toBeVisible();
   
});

// await page.locator('input[type="text"]'.nth(1)).fill("324");
// await page.locator(locator('input[type="text"]').nth(2)).fill("ABCD Bank");
// await page.locator('input[name="coupon"]').fill("FIRST");
// await page.locator(getByRole("button", { name: "Apply Coupon" })).click();
