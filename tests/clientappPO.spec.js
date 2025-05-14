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

    const cartPage = poManager.getCartPage();
    await cartPage.VerifyProductIsDisplayed(productName);
    await cartPage.Checkout();

    const ordersReviewPage = poManager.getOrdersReviewPage();
    await ordersReviewPage.searchCountryAndSelect("ind","India");
    const orderId = await ordersReviewPage.SubmitAndGetOrderId();
   console.log(orderId);
   await dashboardPage.navigateToOrders();
   const ordersHistoryPage = poManager.getOrdersHistoryPage();
   await ordersHistoryPage.searchOrderAndSelect(orderId);
   expect(orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy();

})


