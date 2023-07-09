describe("Login Component", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3001"); 
  });

  // test successful login
  it("should successfully log in with valid credentials", () => {
    cy.intercept("POST", "http://localhost:3000/api/login", {
      statusCode: 200,
      body: { token: "your-token-value" },
    }).as("loginRequest");

    cy.get('input[name="badgeNumber"]').type("123");
    cy.get('input[name="pinCode"]').type("123");
    cy.contains("Sign In").click();

    cy.wait("@loginRequest").then(() => {
      cy.get('button:contains("Success!")').should("be.visible");
    });
  });

  // test unsuccessful login
  it("should display error message with invalid credentials", () => {
    cy.intercept("POST", "http://localhost:3000/api/login", {
      statusCode: 401,
    }).as("loginRequest");

    cy.get('input[name="badgeNumber"]').type("123");
    cy.get('input[name="pinCode"]').type("123");
    cy.contains("Sign In").click();

    cy.wait("@loginRequest").then(() => {
      cy.get('button:contains("Invalid Credentials")').should("be.visible");
    });
  });
});
