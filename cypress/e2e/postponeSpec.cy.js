import {
  postponeableUserLogin,
  resetPostponeableUserLogin,
} from "./specLogin.js";

describe("Sucessful Postpone Component", () => {
  beforeEach(() => {
    resetPostponeableUserLogin();
    postponeableUserLogin();
  });

  it("should sucessfully change the location without changing date", () => {
    resetPostponeableUserLogin();
    cy.get('button:contains("Edit Summons")', { timeout: 10000 }).click();
    cy.get('button:contains("Monterey")').click();
    cy.get('li:contains("King City")').click();
    cy.get('button:contains("Confirm")').click();
    cy.contains("You are no longer able to postpone this summon").should(
      "be.visible"
    );
  });

  it("should sucessfully update the location and date", () => {
    cy.get('button:contains("Edit Summons")', { timeout: 10000 }).click();
    cy.get('button:contains("Monterey")').click();
    cy.get('li:contains("King City")').click();
    cy.get('abbr[aria-label="June 26, 2023"]', { timeout: 10000 }).click();
    cy.get('button:contains("Confirm")').click();
    cy.contains("You are no longer able to postpone this summon").should(
      "be.visible"
    );
  });

  it("should sucessfully update the date without changing location", () => {
    cy.get('button:contains("Edit Summons")', { timeout: 10000 }).click();
    cy.get('abbr[aria-label="June 26, 2023"]', { timeout: 10000 }).click();
    cy.get('button:contains("Confirm")').click();
    cy.contains("You are no longer able to postpone this summon").should(
      "be.visible"
    );
  });
});

describe("Unsucessful Postpone Component", () => {
  beforeEach(() => {
    postponeableUserLogin();
  });

  it('should display "You are no longer able to postpone this summon" if CanPostpone is false', () => {
    cy.contains("You are no longer able to postpone this summon", {
      timeout: 10000,
    }).should("be.visible");
    resetPostponeableUserLogin();
  });
});
