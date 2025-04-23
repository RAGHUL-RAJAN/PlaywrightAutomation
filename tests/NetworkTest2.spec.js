const { test, expect } = require("@playwright/test");

test('Security test request intrupt',async({page})=>{

    await page.goto("https://rahulshettyacademy.com/client");
    await page.getByPlaceholder("email@example.com").fill('jacksparrow007@gmail.com');
    await page.getByPlaceholder("enter your passsword").fill('Qwerty@123');
    await page.getByRole("button", { name: "Login" }).click();
    await page.waitForLoadState("networkidle");
    await page.locator(".card-body b").first().waitFor();

        await page.locator("button[routerlink*='myorders']").click();
        await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",
            route=> route.continue({url:"https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=680865dffc76541aad3b43ee1"}) );
            await page.locator("button:has-text('View')").first().click();
            await page.pause();

})

