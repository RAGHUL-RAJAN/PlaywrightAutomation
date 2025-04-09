const {chromium} = require('@playwright/test')

(async ()=>{
   const browser = await chromium.launch({headless : true});
   const page = await browser.newPage();

   await page.goto("https://www.google.com/");

})