import { adminUserLogin, 
         testUser, 
         resetPostponeableUserLogin } from './specLogin.js';

beforeEach(() => {
    adminUserLogin();
});

describe("Sucessful Admin Component", () => {
    it("should display the admin page", () => {
        cy.contains("Search").should("be.visible");
        cy.get('input[placeholder="Enter search query"]').type(testUser.badgeNumber);
        cy.contains("Search"
            , { timeout: 10000 }).click();
        cy.contains(testUser.badgeNumber).should("be.visible");
        cy.get('a[name="editButton"]'
            , { timeout: 10000 }).click();
        cy.contains("Edit").should("be.visible");
        cy.get('input[name="FirstName"]').clear().type("Test");
        cy.get('input[name="LastName"]').clear().type("User");
        cy.get('input[name="MailingAddress"]').clear().type("123 Test St");
        cy.get('input[name="City"]').clear().type("Testville");
        cy.get('input[name="State"]').clear().type("TS");
        cy.get('input[name="Email"]').clear().type("test@test.com");
        cy.get('input[name="SummonsDate"]').clear().type("2100-01-11");
        cy.get('input[name="ReportingLocation"]').clear().type("The Test Center");
        cy.get('button:contains("Save")').click({timeout: 10000});
        cy.contains("Test").should("be.visible");
        cy.contains("User").should("be.visible");
        cy.contains("The Test Center").should("be.visible");
        cy.get('a[name="viewButton"]'
            , { timeout: 10000 }).click();
        cy.get('input[name="MailingAddress"]').should('have.value', '123 Test St');
        resetPostponeableUserLogin();
    });
});
