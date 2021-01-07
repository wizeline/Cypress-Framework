import BasePage from "./BasePage";

class HomePage extends BasePage{

    get accountLink() { return cy.get('#nav-link-accountList'); }
    get searchDropdown() { return cy.get('#searchDropdownBox'); }
    get searchBox() { return cy.get('#twotabsearchtextbox'); }
    get searchButton() { return cy.get('#nav-search-submit-button'); }
    get signOutLink() { return cy.get('#nav-item-signout'); }

    open(){
        cy.visit('/');
    }

    clickSignInLink() {
        this.accountLink.click();
    }

    selectDepartment(department) {
        return this.searchDropdown.select(department, {force: true});
    }

    inputSearchKeyword(keyword) {
        return this.searchBox
            .clear()
            .type(keyword);
    }

    clickSearchButton() {
        return this.searchButton.click();
    }

    isSignedIn() {
        return this.signOutLink.should('exist');
    }
}

module.exports = new HomePage();