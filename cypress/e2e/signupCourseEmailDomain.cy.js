describe("Fluxo Completo de Inscrição em Curso na Guru99", () => {
  beforeEach(() => {
    cy.intercept({ resourceType: /xhr|fetch/ }, { log: false });

    cy.visit("https://www.guru99.com/");
    cy.log("Página Inicial da Guru99 Carregada");
  });

  it("Deve aceitar um email do serviço gmail como email válido para inscrição", () => {
    cy.log('Passo 1: Abrindo o Acordeão "Testing"');
    cy.contains("button", "Testing").scrollIntoView().click();

    cy.log('Passo 2: Verificando Expansão do Painel "Testing"');
    cy.contains("button", "Testing")
      .parent()
      .next(".kt-accordion-panel")
      .should("be.visible")
      .and("not.have.css", "display", "none");

    cy.log('Passo 3: Clicando no Link "JUnit"');
    cy.get('a[href="/junit-tutorial.html"]').first().click({ force: true });

    cy.log("Passo 4: Preenchendo o Formulário de Inscrição");
    cy.get("#awf_field-118121359").type("joaodasilva@gmail.com");

    cy.log("Passo 5: Submetendo o Formulário de Inscrição");
    cy.get("#af-body-1313383822 > .buttonContainer > .submit").click();

    cy.log("Passo 6: Validando Mensagem de Sucesso (no Aweber)");
    cy.origin("https://www.aweber.com", () => {
      cy.get("h1.h3.text--bold.p--xs-none-t").contains("You're subscribed!");
    });

    cy.log("Fluxo de Inscrição Concluído com Sucesso!");
  });

  it("Deve aceitar um email do serviço hotmail como email válido para inscrição", () => {
    cy.log('Passo 1: Abrindo o Acordeão "Testing"');
    cy.contains("button", "Testing").scrollIntoView().click();

    cy.log('Passo 2: Verificando Expansão do Painel "Testing"');
    cy.contains("button", "Testing")
      .parent()
      .next(".kt-accordion-panel")
      .should("be.visible")
      .and("not.have.css", "display", "none");

    cy.log('Passo 3: Clicando no Link "JUnit"');
    cy.get('a[href="/junit-tutorial.html"]').first().click({ force: true });

    cy.log("Passo 4: Preenchendo o Formulário de Inscrição");
    cy.get("#awf_field-118121359").type("email@hotmail.com");

    cy.log("Passo 5: Submetendo o Formulário de Inscrição");
    cy.get("#af-body-1313383822 > .buttonContainer > .submit").click();

    cy.log("Passo 6: Validando Mensagem de Sucesso (no Aweber)");
    cy.origin("https://www.aweber.com", () => {
      cy.get("h1.h3.text--bold.p--xs-none-t").contains("You're subscribed!");
    });

    cy.log("Fluxo de Inscrição Concluído com Sucesso!");
  });
});
