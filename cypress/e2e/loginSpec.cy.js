describe("Login Component", () => {
  beforeEach(() => {
    cy.visit(Cypress.env("BASE_URL"));
  });

  // test successful login
  it("should successfully log in with valid credentials", () => {
    cy.intercept("POST", `${Cypress.env("API_URL")}/api/login`, {
      statusCode: 200,
      body: { token: "your-token-value" },
    }).as("loginRequest");

    cy.get('Input[name="badgeNumber"]').type("9999999");
    cy.get('Input[name="pinCode"]').type("9999999");
    cy.contains("Sign in").click();
    cy.get('button:contains("Success!")').should("be.visible");
  });

  // test unsuccessful login
  it("should display error message with invalid credentials", () => {
    cy.intercept("POST", `${Cypress.env("API_URL")}/api/login`, {
      statusCode: 401,
    }).as("loginRequest");

    cy.get('input[name="badgeNumber"]').type("123");
    cy.get('input[name="pinCode"]').type("123");
    cy.contains("Sign in").click();
    cy.get('button:contains("Invalid Credentials")').should("be.visible");
  });
});
