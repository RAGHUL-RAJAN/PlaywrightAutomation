class LoginPage {
    constructor(page) {
        this.page = page
        this.SiginButton = page.locator("[value='Login']")
        this.UserName = page.locator("#userEmail")
        this.UserPassword = page.locator("#userPassword")
    }

    async goTo(){
        await this.page.goto("https://rahulshettyacademy.com/client");
    }

    async validLogin(username, password) {
        await this.UserName.fill(username);
        await this.UserPassword.type(password);
        await this.SiginButton.click();
        await this.page.waitForLoadState('networkidle');
    }
}

module.exports = {LoginPage};