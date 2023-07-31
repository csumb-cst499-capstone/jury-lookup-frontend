const { defineConfig } = require("cypress");

module.exports = defineConfig({
  env: {
    API_URL: "http://127.0.0.1:8080",
    BASE_URL: "http://127.0.0.1:3000",
  },
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
