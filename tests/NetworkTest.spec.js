const { test, expect, request } = require('@playwright/test');
const {APIUtils} = require('../utils/APIUtils');
const loginPayload = { userEmail: "jacksparrow007@gmail.com", userPassword: "Qwerty@123" };
let orderPayload = { orders: [{ country: "Cuba", productOrderedId: "67a8dde5c0d3e6622a297cc8" }] }
const fakePlayloadOrders = {data:[],message:"No Orders"}

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
    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*",
       async route =>{
            const response = await page.request.fetch(route.request());
            let body = JSON.stringify(fakePlayloadOrders);          // Javascript Obj convert into Json 
            route.fulfill(
                {
                    response,
                    body,
                }
            )
        }
        // Intercepting response - API response -> {playwright Fake response} -> browser -> render data on frontend
    )
    
    await page.locator("button[routerlink*='myorders']").click();
    await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*");
    console.log(await page.locator(".mt-4").textContent());
    
});
