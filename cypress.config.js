const { defineConfig } = require("cypress");
const cucumber = require("cypress-cucumber-preprocessor").default;

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://localhost:4200",
    video: false,
    screenshotOnRunFailure: false,
    defaultCommandTimeout: 5_000,
    pageLoadTimeout: 10_000,
    specPattern: "cypress/integration/**/*.feature",
    setupNodeEvents(on) {
      on("file:preprocessor", cucumber());
    },
  },
});
