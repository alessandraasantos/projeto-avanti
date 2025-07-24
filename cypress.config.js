// cypress.config.js
const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // Implemente os listeners de eventos Node aqui
    },
    baseUrl: 'https://www.guru99.com',
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    // Configurações para desabilitar extensões no navegador Chrome
    // Isso ajuda a evitar interferências de extensões como o Kaspersky
    chromeWebSecurity: false, // Pode ser necessário para lidar com iframes de domínios diferentes
    testIsolation: true, // Garante que cada teste inicie em um estado limpo
  },
  // Configuração para o plugin Cypress para desabilitar extensões
  // Certifique-se de que o plugin 'cypress-browser-permissions' ou similar não esteja ativo se houver conflito
  // Se você tiver problemas, remova ou comente esta parte e tente sem ela.
  // Esta parte é uma tentativa avançada para desabilitar extensões.
  // Para a maioria dos casos, `chromeWebSecurity: false` e `testIsolation: true` já ajudam bastante.
  // Se precisar de uma desativação mais robusta de extensões, considere usar um plugin como 'cypress-browser-permissions'
  // e configurá-lo no `setupNodeEvents`. Por enquanto, vamos manter a configuração padrão do Cypress
  // que já tenta um ambiente limpo.
  // IMPORTANTE: O Cypress já abre o navegador sem extensões por padrão em muitos casos,
  // exceto aquelas que são essenciais para o funcionamento do navegador.
});