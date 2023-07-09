import { postponeableUserLogin, 
         resetPostponeableUserLogin } from './specLogin.js';

describe('Sucessful Postpone Component', () => {
  beforeEach(() => {
    postponeableUserLogin();
  });

  it('should display a calendar if CanPostpone is true', () => {
    resetPostponeableUserLogin();
    cy.contains('You may postpone your service to a later date. Court is held every Monday at 8:00 AM. PDT excluding holidays.'
      , { timeout: 10000 }).should("be.visible");
  });

  it('should display "Postpone date must be after service date" if the selected date is before the service date', () => {
    cy.get('button:contains("Postpone")'
      , { timeout: 10000 }).click();
    cy.get('abbr[aria-label="June 19, 2023"]'
      , { timeout: 10000 }).click();
    cy.get('button:contains("Confirm")').click();
    cy.contains('Date must be later than your original summons date.'
      , { timeout: 10000 }).should("be.visible");
  });

  it('should display "Postpone date must be within 6 weeks of service date" if the selected date is more than 6 weeks after the service date', () => {
    cy.get('button:contains("Postpone")'
      , { timeout: 10000 }).click();
    cy.get('button[class="react-calendar__navigation__arrow react-calendar__navigation__next-button"]'
      , { timeout: 10000 }).click();
    cy.get('button[class="react-calendar__navigation__arrow react-calendar__navigation__next-button"]'
      , { timeout: 10000 }).click();
    cy.get('abbr[aria-label="August 21, 2023"]'
      , { timeout: 10000 }).click();
    cy.get('button:contains("Confirm")').click();
    cy.contains('Date must be within 6 weeks of your original summons date.'
      , { timeout: 10000 }).should("be.visible");
  });

  it('should display "You have successfully postponed your service date" if the selected date is valid', () => {  
    cy.get('button:contains("Postpone")'
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
