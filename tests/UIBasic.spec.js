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

test("UI basic",async({page})=>{

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const userName = page.locator('#username');
    const signIn = page.locator('#signInBtn');
    const dropdown = await page.locator('select.form-control');
    await dropdown.selectOption("consult");
    await page.locator(".radiotextsty").last().click();
    await page.locator("#okayBtn").click();

    // assertion
    console.log(await page.locator(".radiotextsty").last().isChecked());
    await expect(page.locator(".radiotextsty").last()).toBeChecked();

    // Clicking the checkbox 
    await page.locator("#terms").click();
    await expect(page.locator("#terms")).toBeChecked();

    // un selecting the checkbox  
    await page.locator("#terms").uncheck();
    expect(await page.locator("#terms").isChecked()).toBeFalsy();


    // await page.pause();

})

test('child windows handling',async({browser})=>
    {

    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const documentLink = page.locator("[href*='documents-request']");

    const [newPage] = await Promise.all([

    context.waitForEvent('page'),
    documentLink.click(),
    
    ])

    const text = await newPage.locator(".red").textContent();

    const arrayText = text.split("@");
   const mail = arrayText[1].split(" ")[0]
    console.log(mail);

    page.locator("#username").fill(mail)

})
