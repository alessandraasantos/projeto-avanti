describe('Impedir inscrição com email inválido ao se inscrever em um curso', () => {
  beforeEach(() => {
    // Acessa a página principal antes de cada teste
    cy.visit('https://www.guru99.com/');
  });

  it('Não deve permitir inscrição com formato de email inválido', () => {
    // Clica no botão "Testing"
    cy.contains('button', 'Testing').click();

    // Clica no link "JUnit"
    cy.contains('a', 'JUnit').click({ force: true });

    // Digita um email inválido
    cy.get('#awf_field-118121359').type('ale@gmail');

    // Clica no botão "Sign Up Now!"
    cy.get('input[value="Sign Up Now!"]').click();

    // Verifica o redirecionamento e asserções no novo domínio
    cy.origin('https://www.aweber.com', () => {
      cy.url().should('include', 'form-sorry.htm');
      cy.get('#error-heading').should('have.text', 'Email Address Is Not Valid');
    });
  });
});
