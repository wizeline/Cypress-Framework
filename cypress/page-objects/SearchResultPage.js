import BasePage from "./BasePage";



class SearchResultPage extends BasePage{

    get sortButton() { return cy.get('#s-result-sort-select'); }
    get englishCheckbox() { return cy.get('.a-size-base.a-color-base').contains('English'); }
    get nextButton() { return cy.get('li.a-last'); }
    get items() { return cy.get('.s-image'); }
    get dates() { return cy.get('.a-size-base.a-color-secondary.a-text-normal'); }

    selectSortOption(option) {
        return this.sortButton.select(option, {force: true});
    }

    setEnglishCheckbox() {
        return this.englishCheckbox.click();
    }

    clickNextButton() {
        return this.nextButton.click();
    }

    isPaginated() {
        return this.nextButton
            .then((nextButton) => {
                const disabled = nextButton.hasClass('a-disabled');
                return this.items.then((items) => {
                    const numberOfItemsOnPage = items.length;
                    if (!disabled) {
                        if (numberOfItemsOnPage === 16) {
                            return this.clickNextButton()
                                .then(this.isPaginated.bind(this));
                        }
                        return false;
                    } else {
                        return numberOfItemsOnPage <= 16;
                    }
                });
            });
    }

    isSortedByPublicationDate() {
        return this.getDate([])
            .then((dates) => {
                for (let i = 0; i < dates.length; i++)
                {
                    if(dates[i] < dates[i + 1])
                        return false;
                }
            return true;
            });

    }

    getDate(dateList) {
        return this.nextButton
            .then((nextButton) => {
                const disabled = nextButton.hasClass('a-disabled');
                this.items.then((items) => {
                    if(!disabled) {
                        return this.dates.each(date => {
                            dateList.push(Date.parse(date.text()));
                        }).then(() => {
                            return this.clickNextButton().then(this.getDate.bind(this, dateList))
                        });
                    } else {
                        return this.dates.each(date => {
                            dateList.push(Date.parse(date.text()));
                            return dateList;
                        })
                    }
                });
            });
    }
}

module.exports = new SearchResultPage();