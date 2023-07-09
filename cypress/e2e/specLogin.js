const postponeableUser = { badgeNumber: "1781995622", pinCode: "877715" };

export function postponeableUserLogin() {
  cy.visit("http://localhost:3001");
  cy.get('input[name="badgeNumber"]').type(postponeableUser.badgeNumber);
  cy.get('input[name="pinCode"]').type(postponeableUser.pinCode);
  cy.contains("Sign In").click();
};

export function resetPostponeableUserLogin() {
  cy.request('POST', 'http://localhost:3000/api/login/', {
    BadgeNumber: postponeableUser.badgeNumber,
    PinCode: postponeableUser.pinCode
  }).then((response) => {
    const token = response.body.token;
    Cypress.env('token', token);

    cy.request({
      method: 'POST',
      url: 'http://localhost:3000/api/resetSummonsDate',
      body: {
        badgeNumber: postponeableUser.badgeNumber
      },
      headers: {
        Authorization: token
      }
    });
  });
};
