const { defineConfig } = require('cypress')

module.exports = defineConfig({
  video: true, 
  e2e: {
    setupNodeEvents(on, config) {
      
    },
    video: true, // habilita a gravação
    screenshotOnRunFailure: true, // tira screenshot se o teste falhar
  },
})
