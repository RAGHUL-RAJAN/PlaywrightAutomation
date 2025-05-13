const { test, expect } = require('@playwright/test');
const { POManager } = require('./pageObjects/POManager');

test('@Web Client App login', async ({ page }) => {
   const poManager = new POManager(page);
   const email = "anshika@gmail.com";
   const productName = 'zara coat 3';
   const products = page.locator(".card-body");
   const loginPage = poManager.getLoginPage();
   await loginPage.goto();
   await loginPage.validLogin();
   const dashboardPage = poManager.getDashboardPage();
   await dashboardPage.searchProductAddCart(productName);
   await dashboardPage.navigateToCart();

})


