const { test, expect } = require("@playwright/test");

test("Addto Carts", async ({ page }) => {
  const products = page.locator(".card-body");
  const email = "jacksparrow007@gmail.com";
  const productName = "ZARA COAT 3";
  const password = "Qwerty@123";

  await page.goto("https://rahulshettyacademy.com/client");
  await page.locator("#userEmail").fill(email);
  await page.locator("#userPassword").fill(password);
  await page.locator("[value='Login']").click();
  await page.locator(".card-body b").first().waitFor();
  const titles = await page.locator(".card-body b").allTextContents();
  console.log(titles);
  const count = await products.count();
  for (let i = 0; i < count; ++i) {
    if ((await products.nth(i).locator("b").textContent()) === productName) {
      //add to cart
      await products.nth(i).locator("text= Add To Cart").click();
      break;
    }
  }
  await page.locator("[routerlink*='cart']").click();
  await page.locator("div li").first().waitFor();
  const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
  expect(bool).toBeTruthy();

  await page.locator("button:has-text('Buy Now')").click();

  await page.locator("[placeholder*='Country']").pressSequentially("ind");
  const dropdown = page.locator(".ta-results");
  await dropdown.waitFor();
  const optionCount = await dropdown.locator("button").count();
  for (let i = 0; i < optionCount; ++i) {
    const text = await dropdown.locator("button").nth(i).textContent();
    if (text === " India") {
      await dropdown.locator("button").nth(i).click();
      break;
    }
  }
  // await page.pause();
  expect(await page.locator(".user__name [type='text']").first()).toHaveText(
    email
  );
  await page.locator(".action__submit").click();
  await expect(
    page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
  const orderId = await page
    .locator(".em-spacer-1 .ng-star-inserted")
    .textContent();
  console.log(orderId);

  await page.locator("button[routerlink*='myorders']").click();
  await page.locator("tbody").waitFor();
  const row = await page.locator("tbody tr");

  for(let i =0; i < await row.count(); ++i){
   const rowOrderId = await row.nth(i).locator("th").textContent();
   if(orderId.includes(rowOrderId)){
    await row.nth(i).locator("button").first().click();
    break;
   }

  }

  const expectOrderId = await page.locator(".col-text").textContent
if(orderId === expectOrderId){
  
}


});

// await page.locator('input[type="text"]'.nth(1)).fill("324");
// await page.locator(locator('input[type="text"]').nth(2)).fill("ABCD Bank");
// await page.locator('input[name="coupon"]').fill("FIRST");
// await page.locator(getByRole("button", { name: "Apply Coupon" })).click();
