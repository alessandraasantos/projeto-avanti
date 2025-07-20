const { defineConfig } = require('cypress')

module.exports = defineConfig({
  video: true, //  ativa a gravação de vídeo
  e2e: {
    setupNodeEvents(on, config) {
      // Aqui você pode adicionar listeners se precisar
    },
  },
});
