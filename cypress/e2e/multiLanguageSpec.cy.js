    //Login Page
    describe("Multilanguage Home Feature", () => {
      beforeEach(() => {
        cy.visit(Cypress.env("BASE_URL"));
      });
    
      //English Login
      it("should display the login page with English text by default", () => {
        cy.contains("Jury Duty Lookup").should("be.visible");
        cy.contains("Badge Number").should("be.visible");
        cy.get('input[placeholder="Enter your badge number"]').should("be.visible");
        cy.contains("Pin Code").should("be.visible");
        cy.get('input[placeholder="Enter your pin code"]').should("be.visible");
        cy.contains("Sign in").should("be.visible");
        cy.contains("Need Help?").should("be.visible");
      });
    
      //Spanish Login
      it("should display the login page with Spanish text after changing the language", () => {
        cy.contains("Español").click();
        cy.contains("Búsqueda de Servicio de Jurado").should("be.visible");
        cy.contains("Número de Placa").should("be.visible");
        cy.contains("Código PIN").should("be.visible");
        cy.contains("Iniciar Sesión").should("be.visible");
        cy.contains("¿Necesitas Ayuda?").should("be.visible");
      });
    
      //English Modal
      it("should open the modal with English instructions when clicking the 'Need Help?' button in English", () => {
        cy.contains("Need Help?").click();
        cy.contains("Instructions for Sign In").should("be.visible");
        cy.contains("1. Enter your badge number in the \"Badge Number\" field.").should("be.visible");
        cy.contains("2. Enter your pin code in the \"Pin Code\" field.").should("be.visible");
        cy.contains("3. Click on the \"Sign In\" button. If you still have trouble signing in, please call our office for assistance.").should("be.visible");
        cy.contains("Close").should("be.visible");
      });
    
      //Spanish Modal
      it("should open the modal with Spanish instructions when clicking the 'Need Help?' button in Spanish", () => {
        cy.contains("Español").click();
        cy.contains("¿Necesitas Ayuda?").click();
        cy.contains("Instrucciones para Iniciar Sesión").should("be.visible");
        cy.contains("¿No puedes iniciar sesión? Sigue estos pasos:").should("be.visible");
        cy.contains("1. Ingrese su número de placa en el campo \"Número de Placa\".").should("be.visible");
        cy.contains("2. Ingrese su código PIN en el campo \"Código PIN\".").should("be.visible");
        cy.contains("3. Haga clic en el botón \"Iniciar sesión\". Si aún tiene problemas para iniciar sesión, llame a nuestra oficina para obtener ayuda.").should("be.visible");
        cy.contains("Cerrar").should("be.visible");
      });
    });

    //Summon_Details Page
    import {
      postponeableUserLogin,
      resetPostponeableUserLogin,
    } from "./specLogin.js";
    
    describe("Multilanguage logged in Feature", () => {
      beforeEach(() => {
        resetPostponeableUserLogin();
        postponeableUserLogin();
      });
    
      //English SummonDetails
      it("should display the SummonDetails page with correct information in English", () => {
        cy.get("h4").contains("YOU HAVE BEEN SUMMONED FOR JURY SERVICE").should("be.visible");
        cy.contains("Name").should("be.visible"); 
        cy.contains("Badge Number").should("be.visible"); 
        cy.contains("Group Number").should("be.visible"); 
        cy.contains("Please report to").should("be.visible");
        cy.contains("on").should("be.visible");
        cy.contains("at").should("be.visible");
        cy.contains("Court is held every Monday at 8:00 AM PDT, excluding holidays.").should("be.visible");
        cy.contains("You may edit your summons by postponing to a later date and/or changing locations.").should("be.visible");
        cy.contains("Add to your calendar:").should("be.visible");
      });

      //Spanish SummonDetails
      it("should display the SummonDetails page with correct information in Spanish", () => {
        cy.contains("Español").click();
        cy.get("h4").contains("HAS SIDO CONVOCADO PARA EL SERVICIO DE JURADO").should("be.visible");
        cy.contains("Nombre").should("be.visible");
        cy.contains("Número de Placa").should("be.visible");
        cy.contains("Número de Grupo").should("be.visible");
        cy.contains("Por favor, preséntese en").should("be.visible");
        cy.contains("el").should("be.visible");
        cy.contains("a las").should("be.visible");
        cy.contains("El tribunal se lleva a cabo todos los lunes a las 8:00 a. m. PDT, excluyendo días festivos.").should("be.visible");
        cy.contains("Puede editar su citación posponiéndola para una fecha y/o ubicaciones posteriores.").should("be.visible");
        cy.contains("Agregar a tu calendario:").should("be.visible");
      });

    });
  