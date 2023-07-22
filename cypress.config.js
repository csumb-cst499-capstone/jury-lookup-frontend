const { defineConfig } = require("cypress");

module.exports = defineConfig({
  env: {
    API_URL: "http://localhost:8080",
    BASE_URL: "http://localhost:3000",
  },
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
