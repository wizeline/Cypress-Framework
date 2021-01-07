const HomePage = require('../page-objects/HomePage'),
    SignInPage = require('../page-objects/SignInPage'),
    SearchResultPage = require('../page-objects/SearchResultPage');
const Assert = require("assert");

describe('Test cases example', () => {

    beforeEach(() => {
        HomePage.open();
    });

    it('login with invalid account', () => {
        HomePage.clickSignInLink();
        cy.login2Step('invalidLogin');
        SignInPage.errorMessage.should('contain.text', '');
    });

    it('login with valid account', () => {
        HomePage.clickSignInLink();
        cy.login2Step('validLogin');
        HomePage.isSignedIn().should('eq', true);
    })

    it('search result list is paginated if there are more than 16 items',() => {
        HomePage.selectDepartment('Books');
        HomePage.inputSearchKeyword('abc123');
        HomePage.clickSearchButton();
        SearchResultPage.setEnglishCheckbox();
        SearchResultPage.isPaginated().should('eq', true)
    });

    it('search result list can be sorted on demand', () => {
        HomePage.selectDepartment('Books');
        HomePage.inputSearchKeyword('abc123');
        HomePage.clickSearchButton();
        SearchResultPage.setEnglishCheckbox();
        SearchResultPage.selectSortOption('Publication Date');
        SearchResultPage.isSortedByPublicationDate().should('eq', true);
    });
});