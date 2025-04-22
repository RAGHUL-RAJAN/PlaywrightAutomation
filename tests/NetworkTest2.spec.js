const { test, expect } = require("@playwright/test");

test('Security test request intrupt',async({page})=>{

    await page.route("")


})