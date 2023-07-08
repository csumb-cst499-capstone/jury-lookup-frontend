const { Modal } = require("@nextui-org/react");
const { default: Calendar } = require("react-calendar");

describe('login', () => {
  it('passes', () => {
    cy.visit('http://localhost:3001/')
    cy.get('input[name="BadgeNumber"]').type('123456')
    cy.get('input[name="PinCode"]').type('1234')
    cy.get('button[type="submit"]').click()
  })

  it('fails', () => {
    cy.visit('http://localhost:3001/')
    cy.get('input[name="BadgeNumber"]').type('123456')
    cy.get('input[name="PinCode"]').type('1234')
    cy.get('button[type="submit"]').click()

    // expect response 401
    cy.get('div[role="alert"]').should('contain', 'Invalid credentials')
  })
});
