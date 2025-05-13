const { test, expect } = require('@playwright/test');
const { POManager } = require('./pageObjects/POManager');

test.only('@Web Client App login', async ({ page }) => {
   const poManager = new POManager(page);
   const email = "jacksparrow007@gmail.com";
   const password = "Qwerty@123";
   const productName = 'zara coat 3';
   const products = page.locator(".card-body");
   const loginPage = poManager.getLoginPage();
   await loginPage.goTo();
   await loginPage.validLogin(email,password);
   const dashboardPage = poManager.getDashboardPage();
   await dashboardPage.searchProductAddCart(productName);
   await dashboardPage.navigateToCart();

})


