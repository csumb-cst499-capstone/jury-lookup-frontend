import { postponeableUserLogin, 
         resetPostponeableUserLogin } from './specLogin.js';

describe('Sucessful Postpone Component', () => {
  beforeEach(() => {
    postponeableUserLogin();
  });

  it('should display Edit Summons if CanPostpone is true', () => {
    resetPostponeableUserLogin();
    cy.contains('Edit Summons'
      , { timeout: 10000 }).should("be.visible");
  });

  it('should display "You have successfully postponed your service date" if the selected date is valid', () => {  
    cy.get('button:contains("Edit Summons")'
      , { timeout: 10000 }).click();
    cy.get('abbr[aria-label="June 26, 2023"]'
      , { timeout: 10000 }).click();
    cy.get('button:contains("Confirm")').click();
    cy.contains('You are no longer able to postpone this summon').should("be.visible");
  });

  it('should display "You are no longer able to postpone this summon" if CanPostpone is false', () => {
    cy.contains('You are no longer able to postpone this summon'
      , { timeout: 10000 }).should("be.visible");
    resetPostponeableUserLogin();
  });
});
