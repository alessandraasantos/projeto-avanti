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
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

/**
 * para escrever e clicar na caixa e botão de busca (principais), respectivamente
 * usando no teste do cenário 4 - search-educational-content.cy.js
 */
Cypress.Commands.add("typeAndSearch", (keyword) => {
  cy.get("#gsc-i-id1").type(keyword);
  cy.contains("button", "search").click();
});

/**
 * para aguardar o carregamento do modal de resultado da busca
 * usando no teste do cenário 4 - search-educational-content.cy.js
 */
Cypress.Commands.add("waitingLoad", (className) => {
  // TODO: retirar o timeout caso não seja necessário
  cy.get(className, { timeout: 10000 }).should("be.visible");
});
