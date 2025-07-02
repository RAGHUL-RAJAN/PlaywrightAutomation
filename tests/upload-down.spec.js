// const ExcelJs = require('exceljs');
const { test, expect } = require("@playwright/test");

async function writeTest(searchText, replaceText, change, filepath) {

    const workbook = new ExcelJs.Workbook();
    await workbook.xlsx.readFile(filepath)
    const worksheet = workbook.getWorksheet('Sheet1');
    const output = await readExcel(worksheet, searchText);

    const cell = worksheet.getCell(output.row, output.column + change.colChange);
    cell.value = replaceText;
    await workbook.xlsx.writeFile(filepath);
}

async function readExcel(worksheet, searchText) {
    let output = { row: -1, column: -1 };
    worksheet.eachRow((row, rowNumber) => {
        row.eachCell((cell, colNumber) => {

            if (cell.value === searchText) {
                output.row = rowNumber;
                output.column = colNumber;
            }
        })
    })
    return output;

}

// writeTest("Apple", 350,{rowChange:0,colChange:2},"C:\\Users\\HP\\Downloads\\ExceldownloadTest.xlsx");

test("upload download excel validation", async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/upload-download-test/index.html");
    const downloadPromise = page.waitForEvent('download');
    await page.getByRole('button', { name: 'Download' }).click();
    await downloadPromise;
    writeTest("Apple", 350, { rowChange: 0, colChange: 2 }, "C:\\Users\\HP\\Downloads\\download.xlsx");

    await page.locator("#fileinput").click();
    await page.locator("#fileinput").setInputFiles("C:\\Users\\HP\\Downloads\\download.xlsx");
}) 