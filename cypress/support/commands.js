// cypress/support/commands.js

Cypress.Commands.add('waitForThriveCartIframe', (timeout = 20000) => {
  cy.log('Aguardando iframe do ThriveCart...');
  
  // Primeiro verifica se há qualquer iframe na página
  cy.get('body iframe', { timeout }).should('exist').then(($iframes) => {
    // Tenta encontrar o iframe do ThriveCart específico
    const thriveCartIframe = $iframes.filter((index, iframe) => {
      return iframe.src.includes('thrivecart') || 
             iframe.title.includes('Checkout') ||
             iframe.id.includes('thrivecart');
    });

    if (thriveCartIframe.length > 0) {
      return cy.wrap(thriveCartIframe.first());
    }
    throw new Error('Iframe do ThriveCart não encontrado');
  })
  .its('0.contentDocument.body')
  .should('not.be.empty')
  .then(cy.wrap);
});

Cypress.Commands.add('forceClickThriveCartButton', () => {
  cy.get('img[src*="buttonbuynow99"], img[src*="thrivecart-button"]', { timeout: 15000 })
    .should('be.visible')
    .parent('a')
    .then($btn => {
      $btn.removeAttr('target');
      $btn.removeAttr('onclick');
      $btn.css('visibility', 'visible');
    })
    .click({ force: true, multiple: true });
});