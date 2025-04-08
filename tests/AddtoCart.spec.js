const{ test, expect } = require('@playwright/test');

test.only('crm login',async({page})=>{

    const productName = "ZARA COAT 3"

    const products = page.locator(".card-body b");
    const email = "anshika@gmail.com";
    const password = "Iamking@000";
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("#userEmail").fill(email);
    await page.locator("#userPassword").fill(password);
    await page.locator("[value='Login']").click();
    const count = products.count();

    for(let i=0; i < count; ++i){

        if( await products.nth(i).locator("b").textContent() === productName){

            await products.nth(i).locator("text= Add To Cart").click();
            console.log("clicked ************")
            break;
        } 

    }

    await page.locator("[routerlink*='cart']").click();

    await page.locator('div li').waitFor();
    
    const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
    expect(bool).toBeTruthy();

    // await page.pause();


})


