const { defineConfig } = require("cypress");

module.exports = defineConfig({
  screenshotOnRunFailure: false,
  video: false,
  reporter: 'mochawesome',
  reporterOptions: {
    reportDir: 'cypress/report/all',
    reportFilename: 'result-[name]',
    charts: false,
    embeddedScreenshots: true,
    inlineAssets: true,
    html: true,
    json: true,
    quiet: true,
    overwrite: false,
  },
  e2e: {
    setupNodeEvents(on, config) {
    },
  },
});
