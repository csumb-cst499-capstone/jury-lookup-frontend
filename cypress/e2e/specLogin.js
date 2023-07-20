export const testUser = { badgeNumber: "687056417", pinCode: "164523" };

export function postponeableUserLogin() {
  cy.visit("http://localhost:3000");
  cy.get('input[placeholder="Enter your badge number"]').type(
    testUser.badgeNumber
  );
  cy.get('input[placeholder="Enter your pin code"]').type(testUser.pinCode);
  cy.contains("Sign In").click();
}

export function adminUserLogin() {
  cy.visit("http://localhost:3000");
  cy.get('li:contains("Login")').click();
}

export function resetPostponeableUserLogin() {
  cy.request("POST", "http://localhost:8080/api/login/", {
    BadgeNumber: testUser.badgeNumber,
    PinCode: testUser.pinCode,
  }).then((response) => {
    const token = response.body.token;
    Cypress.env("token", token);

    cy.request({
      method: "POST",
      url: "http://localhost:8080/api/resetSummonsTest",
      body: {
        badgeNumber: testUser.badgeNumber,
      },
      headers: {
        Authorization: token,
      },
    });
  });
}
