describe("Cenário de teste 04: Buscar conteúdo educativo com palavra-chave", () => {
  beforeEach(() => {
    cy.visit("https://guru99.com");
  });

  it("Deve detectar se anúncios estão presentes via iframe", () => {
    cy.typeAndSearch("Selenium");

    cy.waitingLoad(".gsc-results-wrapper-visible");

    // Verifica se há um iframe com src relacionado a anúncios
    cy.get("iframe").then(($iframes) => {
      expect($iframes.length).to.be.greaterThan(0); // garante que existe pelo menos um iframe

      const anunciosDetectados = [...$iframes].some(
        (iframe) =>
          iframe.src.includes("syndicatedsearch.goog") ||
          iframe.src.includes("ads") ||
          iframe.src.includes("doubleclick")
      );

      if (anunciosDetectados) {
        cy.log("⚠️ Anúncio detectado no iframe");
        // descomentar a linha abaixo para falhar o teste
        // throw new Error("Resultado patrocinado detectado.");
      } else {
        cy.log("✅ Nenhum anúncio detectado");
      }
    });
  });

  it("Deve ser possível acessar um resultado da busca", () => {
    cy.typeAndSearch("Selenium");

    cy.waitingLoad(".gsc-results-wrapper-visible");

    // rola a tela até o container com os resultados do guru99 estarem visíveis
    cy.get(".gs-result").first().scrollIntoView().should("be.visible");

    // clica no primeiro resultado da busca e abre nova aba com o link
    // cy.get(".gs-title")
    //   .should("be.visible")
    //   .first()
    //   .then(($link) => {
    //     cy.wrap($link).click();
    //   });

    // Clica no primeiro resultado da busca, mas visita diretamente o link
    cy.get("a.gs-title")
      .should("be.visible")
      .first()
      .invoke("attr", "href")
      .should("include", "guru99.com")
      .then((href) => {
        cy.visit(href);
      });
  });
});
