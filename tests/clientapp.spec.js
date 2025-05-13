// const {test,expect}= require ('@playwright/test')

// test('client app',async({page})=>{
//     await page.goto("https://rahulshettyacademy.com/client");
//     await page.locator("#userEmail").fill("anshika@gmail.com");
//     await page.locator("#userPassword").fill("Iamking@000");
//     await page.locator("[value='Login']").click();
//     // await page.waitForLoadState("networkidle")
// })

const { test, expect } = require('@playwright/test');

test('@Web Client App login', async ({ page }) => {
   const email = "jacksparrow007@gmail.com";
   const password = "Qwerty@123";
   const productName = 'zara coat 3';
   const products = page.locator(".card-body");
   await page.goto("https://rahulshettyacademy.com/client");
   await page.locator("#userEmail").fill(email);
   await page.locator("#userPassword").fill(password);
   await page.locator("[value='Login']").click();
   await page.waitForLoadState('networkidle');
   await page.locator(".card-body b").first().waitFor();
   const titles = await page.locator(".card-body b").allTextContents();
   console.log(titles);

})

// OUTPUT : 

// [ 'ZARA COAT 3', 'ADIDAS ORIGINAL', 'IPHONE 13 PRO' ]
