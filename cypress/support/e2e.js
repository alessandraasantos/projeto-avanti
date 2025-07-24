import 'cypress-wait-until';


Cypress.Commands.add('getIframeBody', (iframeSelector) => {
  return cy.get(iframeSelector, { timeout: 20000 })
    .should('be.visible')
    .its('0.contentDocument.body').should('not.be.empty')
    .then(cy.wrap);
});

// Comando para acessar campos dentro dos iframes do Stripe
Cypress.Commands.add('getStripeIframeInput', (iframeSelector, inputSelector) => {
  return cy
    .get(iframeSelector, { timeout: 20000 })
    .should('exist')
    .then(($iframe) => {
      const body = $iframe.contents().find('body');
      cy.wrap(body).find(inputSelector, { timeout: 15000 }).should('be.visible');
      return cy.wrap(body).find(inputSelector);
    });
});


// cypress/support/e2e.js

Cypress.on('uncaught:exception', (err, runnable) => {
  // Lista de erros conhecidos de scripts externos
  const knownErrors = [
    'freestar is not defined',
    'ga is not defined',
    'gtag is not defined',
    'Stripe is not defined',
    'r.stripe.com',
  ];

  // Se a mensagem de erro contiver algum erro conhecido, ignora
  if (knownErrors.some(error => err.message.includes(error))) {
    return false;
  }

  // Caso contrário, permite falhar normalmente
  return true;
});