const { test, expect, request } = require("@playwright/test");
let token;
let orderId;
const loginPayload = { userEmail: "jacksparrow007@gmail.com", userPassword: "Qwerty@123" };
let orderPayload = { orders: [{ country: "Cuba", productOrderedId: "67a8dde5c0d3e6622a297cc8" }] }


// Login API
test.beforeAll(async () => {
    const apiContext = await request.newContext();
    const loginResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
        {
            data: loginPayload
        }
    )
    expect(loginResponse.ok()).toBeTruthy();
    const loginResponsejson = await loginResponse.json();
    token = loginResponsejson.token;
    console.log(token);

    const orderResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
        {
            data: orderPayload,
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            },
        }
    )
    const orderResponseJson = await orderResponse.json();
    console.log(orderResponseJson);
    orderId = await orderResponseJson.orders[0];
});


test("Addto Carts", async ({ page }) => {

    page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, token)

    const productName = "ZARA COAT 3";
    const products = page.locator(".card-body");
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator(".card-body b").first().waitFor();
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

    const expectOrderId = await page.locator(".col-text").textContent;

    await page.pause();
    expect(orderId.includes(expectOrderId)).toBeTruthy();
});
