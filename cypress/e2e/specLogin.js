const testUser = { badgeNumber: "1781995622", pinCode: "877715" };

export function postponeableUserLogin() {
  cy.visit("http://localhost:3001");
  cy.get('input[name="badgeNumber"]').type(testUser.badgeNumber);
  cy.get('input[name="pinCode"]').type(testUser.pinCode);
  cy.contains("Sign In").click();
};

export function resetPostponeableUserLogin() {
  cy.request('POST', 'http://localhost:3000/api/login/', {
    BadgeNumber: testUser.badgeNumber,
    PinCode: testUser.pinCode
  }).then((response) => {
    const token = response.body.token;
    Cypress.env('token', token);

    cy.request({
      method: 'POST',
      url: 'http://localhost:3000/api/resetSummonsDate',
      body: {
        badgeNumber: testUser.badgeNumber
      },
      headers: {
        Authorization: token
      }
    });
  });
};