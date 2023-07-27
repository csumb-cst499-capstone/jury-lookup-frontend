describe("Multi-Language Functionality", () => {
    beforeEach(() => {
      cy.visit(Cypress.env("BASE_URL"));
    });
  
    it("should switch between English and Spanish", () => {
      //default english(US)
      cy.contains("Search").should("be.visible");
      cy.contains("Español").should("not.have.class", "selected");
  
      //change to spanish
      cy.contains("Español").click();
      cy.contains("Búsqueda").should("be.visible");
      cy.contains("Español").should("have.class", "selected");
      cy.contains("English(US)").should("not.have.class", "selected");
  
      //change to english
      cy.contains("English(US)").click();
      cy.contains("Search").should("be.visible");
      cy.contains("English(US)").should("have.class", "selected");
      cy.contains("Español").should("not.have.class", "selected");
    });
  });
  