const postponeableUser = { badgeNumber: "917803216", pinCode: "118975" };
const nonPostponeableUser = { badgeNumber: "1781995622", pinCode: "877715" };

export function nonPostponeableUserLogin() {
  cy.visit("http://localhost:3001");
  cy.get('input[name="badgeNumber"]').type(nonPostponeableUser.badgeNumber);
  cy.get('input[name="pinCode"]').type(nonPostponeableUser.pinCode);
  cy.contains("Sign In").click();
};

export function postponeableUserLogin() {
  cy.visit("http://localhost:3001");
  cy.get('input[name="badgeNumber"]').type(postponeableUser.badgeNumber);
  cy.get('input[name="pinCode"]').type(postponeableUser.pinCode);
  cy.contains("Sign In").click();
};

