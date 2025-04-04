const {test, expect} = require('@playwright/test')

test('first playwright test',async ({page})=>
{
    const userName = page.locator("[placeholder='Email']");
    const signIn = page.locator("//span[text()='Sign in']");

    await page.goto("https://pix-crm.pibase.info/login");
    console.log(await page.title());
    await expect(page).toHaveTitle("Login");

    await page.locator("[placeholder='Email']").fill("raghul@pibase.info");
    await page.locator("[placeholder='Password']").fill("Qwerty@123");
    await page.waitForTimeout(2000);
    // await page.click("//span[text()='Sign in']");

    await userName.fill("");
    await userName.fill("raghul+qa@pibase.info")
    await page.waitForTimeout(2000);

    await signIn.click();
    // console.log(await page.locator("//label[text()='Email']//parent::div//p").textContent);

});

test.only("UI basic",async({page})=>{

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

    const userName = page.locator('#username');
    const signIn = page.locator('#signInBtn');
    const dropdown = await page.locator('select.form-control');
    dropdown.selectOption("consult");

    await page.pause();

})
