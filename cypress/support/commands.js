// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

import { addMatchImageSnapshotCommand } from 'cypress-image-snapshot/command'

addMatchImageSnapshotCommand();

Cypress.Commands.add('isVisible', selector => {
    cy.get(selector).should('be.visible');
});

Cypress.Commands.add('isInvisible', selector => {
    cy.get(selector).should('not.be.visible');
});

Cypress.Commands.add('isExist', selector => {
    cy.get(selector).should('exist');
});

Cypress.Commands.add('isHidden', selector => {
    cy.get(selector).should('not.exist');
});

Cypress.Commands.add('setValue', (selector, value) => {
    cy.get(selector).type(value);
});

Cypress.Commands.add('clickButton', (selector) => {
    cy.get(selector).click();
});

Cypress.Commands.add('setResolution', size => {
    if (Cypress._.isArray(size)){
        cy.viewport(size[0], size[1]);
    } else {
        cy.viewport(size);
    }
});

Cypress.Commands.add('uploadFile', (locator, fileName, fileType) => {
    cy.get(locator).then(element => {
        cy.fixture(fileName, 'base64')
            .then(Cypress.Blob.base64StringToBlob)
            .then(blob => {
                const file = new File([blob], fileName, {type: fileType});
                const dataTransfer = new DataTransfer();
                dataTransfer.items.add(file);
                element.files = dataTransfer.files;
                cy.get(locator).trigger('change', {force: true});
            });
    });
});

Cypress.Commands.add('downloadFile', (locator, filePath) => {
    //TODO
})

Cypress.Commands.add('dropFile', (locator, fileName, fileType = '') => {
    cy.get(locator).then(element => {
        cy.fixture(fileName, 'base64')
            .then(Cypress.Blob.base64StringToBlob)
            .then(blob => {
                const file = new File([blob], fileName, {type: fileType});
                const dataTransfer = new DataTransfer();
                dataTransfer.items.add(file);
                element.files = dataTransfer.files;
                const event = { dataTransfer: { files: [file] } }
                cy.get(locator).trigger('drop', event);
            });
    });
});

Cypress.Commands.add('login', (fileName, username = '', password = '', button = '') => {
    cy.get('form').first().within((form) => {
        cy.fixture(fileName).then( user => {
            let str = [];
            str[0] = user.username.toString();
            str[1] = user.password.toString();
            let i = 0;
            if (username === '' && password === '')
            {
                cy.get('input').
                each(($el, index, $list) => {
                    if($el.is(":visible") && i <= 1)
                    {
                        cy.wrap($el)
                            .clear()
                            .type(str[i]);
                        i++;
                    }
                });
            } else {
                cy.get(username)
                    .clear()
                    .type(str[0]);
                cy.get(password)
                    .clear()
                    .type(str[1]);
            }
        });
        if (button === '') {
            cy.root().submit();
        } else {
            cy.get(button).click();
        }
    });
});

Cypress.Commands.add('login2Step', (fileName) => {
    cy.fixture(fileName).then( user => {
        cy.get('form').first().within(() => {
            let i = 0;
            cy.get('input')
                .each(($el, index, $list) => {
                    if($el.is(":visible") && i < 1)
                    {
                        cy.wrap($el)
                            .clear()
                            .type(user.username);
                        i++;
                    }
                });
            cy.root().submit();
        });
        cy.get('form').first().within(() => {
            let i = 0;
            cy.get('input')
                .each(($el, index, $list) => {
                    if($el.is(":visible") && i < 1)
                    {
                        cy.wrap($el)
                            .clear()
                            .type(user.password);
                        i++;
                    }
                });
            cy.root().submit();
        });
    });
});