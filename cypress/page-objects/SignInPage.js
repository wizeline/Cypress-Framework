import BasePage from "./BasePage";

class SignInPage extends BasePage{

    get email() { return cy.get('#ap_email'); }
    get password() { return cy.get('#ap_password'); }
    get continueButton() { return cy.get('#continue'); }
    get signInButton() { return cy.get('#signInSubmit'); }
    get errorMessage() { return cy.get('#auth-error-message-box').children().children(); }

    inputEmail(email) {
        this.email
            .clear()
            .type(email);
    }

    inputPassword(password) {
        this.password
            .clear()
            .type(password);
    }

    login(user) {
    }

    clickContinueButton() {
        this.continueButton.click();
    }

    clickSignInButton() {
        this.signInButton.click();
    }
}

module.exports = new SignInPage();