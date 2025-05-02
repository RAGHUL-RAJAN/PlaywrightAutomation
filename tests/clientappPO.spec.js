const { test, expect } = require('@playwright/test');
const {LoginPage} = require('./pageObjects/LoginPage')

test('@Web Client App login', async ({ page }) => {
   const email = "anshika@gmail.com";
   const productName = 'zara coat 3';
   const products = page.locator(".card-body");
   const loginPage = new LoginPage(page)
   loginPage.goTo();
   loginPage.validLogin();
 
   await page.waitForLoadState('networkidle');
   await page.locator(".card-body b").first().waitFor();
   const titles = await page.locator(".card-body b").allTextContents();
   console.log(titles); 
 
})


