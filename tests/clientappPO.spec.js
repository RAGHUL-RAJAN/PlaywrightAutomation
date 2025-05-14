const { test, expect } = require('@playwright/test');
const { POManager } = require('../pageObjects/POManager');
const dataset = JSON.parse(JSON.stringify(require("../utils/placeorderTestData.json")));

test.only('@Web Client App login', async ({ page }) => {
   const poManager = new POManager(page);
   // const email = "jacksparrow007@gmail.com";
   // const password = "Qwerty@123";
   // const productName = 'zara coat 3';
   const products = page.locator(".card-body");
   const loginPage = poManager.getLoginPage();
   await loginPage.goTo();
   await loginPage.validLogin(dataset.username, dataset.password);
   const dashboardPage = poManager.getDashboardPage();
   await dashboardPage.searchProductAddCart(dataset.productName);
   await dashboardPage.navigateToCart();

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
   await expect(page.locator(".hero-primary")).toHaveText(
      " Thankyou for the order. "
   );
   const orderId = await page
      .locator(".em-spacer-1 .ng-star-inserted")
      .textContent();
   console.log(orderId);

   await page.locator("button[routerlink*='myorders']").click();
   await page.locator("tbody").waitFor();
   const row = await page.locator("tbody tr");

   for (let i = 0; i < (await row.count()); ++i) {
      const rowOrderId = await row.nth(i).locator("th").textContent();
      if (orderId.includes(rowOrderId)) {
         await row.nth(i).locator("button").first().click();
         break;
      }
   }

   await expect(page.locator(".col-text")).toHaveCount(1);
   const expectOrderId = (await page.locator(".col-text").textContent())?.trim();
   expect(expectOrderId).not.toBeNull();
   expect(orderId.includes(expectOrderId)).toBeTruthy();

})


