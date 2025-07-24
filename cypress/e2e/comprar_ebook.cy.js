// cypress/e2e/comprar_ebook.cy.js

// A página é poluída e possui muitos popups, certifique-se de obrigatoriamente rodar o teste mais de uma vez. 
// Certifique-se de que este comando personalizado está definido em cypress/support/e2e.js
// Cypress.Commands.add('getIframeBody', (iframeSelector, options) => {
//   return cy.get(iframeSelector, options)
//     .should('be.visible')
//     .its('0.contentDocument.body').should('not.be.empty')
//     .then(cy.wrap);
// });

describe('CT08 - Fluxo de compra de eBook Guru99 com cartão de crédito', () => {
  // O handler de exceções deve estar no arquivo support/e2e.js e será aplicado globalmente.
  // Cypress.on('uncaught:exception', (err, runnable) => {
  //   return false;
  // });

  it('Deve acessar o eBook, preencher o formulário de compra e verificar o botão de compra', () => { 
    const email = 'teste.automatizado@exemplo.com';
    const cardNumber = '5417048587030524'; // Número de cartão válido para teste (Mastercard)
    const cvc = '999';
    const expiryDate = '11/28'; // Use uma data de vencimento válida e futura
    const quantity = '20'; // Quantidade de eBooks desejada
    const expectedTotalPrice = '$199.80'; // Preço esperado para 20 unidades (9.99 * 20)

    // Seletores dos elementos da página
    const ebookCatalogLinkSelector = '.w3-container1.w3-half1 a'; 
    const buyNowButtonSelector = 'a[data-thrivecart-account="guru99"]'; 
    const thriveCartModalContainerSelector = 'div[role="dialog"].thrivecart-modal-content';
    const thriveCartContentIframeSelector = 'iframe[src*="guru99.thrivecart.com/3/?_embeddable"]';
    const customerEmailInputSelector = 'input[name="customer.email"]';
    const stripeCardFieldsIframeSelector = 'iframe[title="Secure card payment input frame"]';
    const ccNumberInputSelector = 'input[autocomplete="cc-number"]';
    const ccExpiryInputSelector = 'input[autocomplete="cc-exp"]';
    const ccCvcInputSelector = 'input[autocomplete="cc-csc"]';
    const quantityInputSelector = 'span.multibuy-action-input input[type="number"]';
    const completeOrderButtonTextSelector = 'span.builder-v2-block-plaintext:contains("Complete Order")';
    const totalPriceSelector = 'li.order-details-total em[data-currency="$"]'; 

    // Rolar até a seção de catálogo de ebooks disponibilizados
    cy.visit('https://www.guru99.com/ebook-pdf.html');

    // Clicar em um ebook disponível desejado no catálogo disponibilizado
    cy.get(ebookCatalogLinkSelector, { timeout: 10000 })
      .first()
      .invoke('removeAttr', 'target')
      .click();

    cy.url().should('include', 'python-tutorial-pdf.html');

    // Clicar no botão “Buy Now” abaixo da descrição do livro.
    cy.get(buyNowButtonSelector, { timeout: 15000 })
      .first()
      .should('be.visible')
      .click();

    cy.get(thriveCartModalContainerSelector, { timeout: 20000 })
      .should('be.visible')
      .within(() => {
        cy.getIframeBody(thriveCartContentIframeSelector, { timeout: 15000 })
          .should('be.visible')
          .within(() => {
            // Preencher um email válido (no formato email@gmail.com) no campo "Your email address".
            cy.get(customerEmailInputSelector, { timeout: 15000 })
              .should('be.visible')
              .type(email, { delay: 50 });

            // Selecionar o método de compra como "Credit card".
            // Preencher um número de cartão de crédito válido (5417 0485 8703 0524).
            // Preencher um número CVC válido (999).
            // Preencher uma data de vencimento válida (com mês e ano iguais ou superiores ao mês atual no formato MM/YY) 11/28.
            cy.getIframeBody(stripeCardFieldsIframeSelector, { timeout: 30000 })
              .within(() => {
                cy.get(ccNumberInputSelector).type(cardNumber, { delay: 50, force: true });
                cy.get(ccExpiryInputSelector).type(expiryDate, { delay: 50, force: true });
                cy.get(ccCvcInputSelector).type(cvc, { delay: 50, force: true });
              });

            // Alterar a quantidade para 20
            cy.get(quantityInputSelector, { timeout: 10000 })
              .should('be.visible')
              .and('have.value', '1')
              .clear()
              .type(quantity)
              .trigger('change')
              .trigger('blur')
              .should('have.value', quantity);

            // Verificar se o preço x20 está correto
            cy.get(totalPriceSelector, { timeout: 10000 })
              .should('be.visible')
              .and('contain', expectedTotalPrice);

            // Verificar se o botão “Complete Order” está visível e habilitado (status 200)
            cy.get(completeOrderButtonTextSelector, { timeout: 10000 })
              .should('be.visible') 
              .and('contain', 'Complete Order'); 
          });
      });
    // Log de sucesso
    cy.log('O fluxo de preenchimento foi concluído e o botão "Complete Order" foi verificado com sucesso!');
  });
});