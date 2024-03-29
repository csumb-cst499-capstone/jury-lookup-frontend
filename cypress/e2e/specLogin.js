export const testUser = { badgeNumber: "687056417", pinCode: "164523" };

export function postponeableUserLogin() {
  cy.visit(Cypress.env("BASE_URL"));
  cy.get('input[placeholder="Enter your badge number"]').type(
    testUser.badgeNumber
  );
  cy.get('input[placeholder="Enter your pin code"]').type(testUser.pinCode);
  cy.contains("Sign in").click();
}

export function adminUserLogin() {
  cy.visit(Cypress.env("BASE_URL"));
  cy.get('li:contains("Login")').click();
}

export function resetPostponeableUserLogin() {
  cy.request("POST", `${Cypress.env("API_URL")}/api/login`, {
    BadgeNumber: testUser.badgeNumber,
    PinCode: testUser.pinCode,
  }).then((response) => {
    const token = response.body.token;
    Cypress.env("token", token);

    cy.request({
      method: "POST",
      url: `${Cypress.env("API_URL")}/api/resetSummonsTest`,
      body: {
        badgeNumber: testUser.badgeNumber,
      },
      headers: {
        Authorization: token,
      },
    });
  });
}
