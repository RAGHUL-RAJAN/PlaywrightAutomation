const { test, expect, request } = require('@playwright/test');
const {APIUtils} = require('../utils/APIUtils');
const loginPayload = { userEmail: "jacksparrow007@gmail.com", userPassword: "Qwerty@123" };
let orderPayload = { orders: [{ country: "Cuba", productOrderedId: "67a8dde5c0d3e6622a297cc8" }] }

let response;
test.beforeAll(async () => {
    const apiContext = await request.newContext();
    const apiUtils = new APIUtils(apiContext,loginPayload);
    response = await apiUtils.createOrder(orderPayload);
})

test("Place to cart", async ({ page }) => {
    page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, response.token);

    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("button[routerlink*='myorders']").click();
    await page.locator("tbody").waitFor();
    const row = await page.locator("tbody tr");

    for (let i = 0; i < await row.count(); ++i) {
        const rowOrderId = await row.nth(i).locator("th").textContent();
        if (response.orderId.includes(rowOrderId)) {
            await row.nth(i).locator("button").first().click();
            break;
        }
    }

    const expectOrderId = await page.locator(".col-text").textContent();
    expect(response.orderId.includes(expectOrderId)).toBeTruthy();

});
