// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('loginWithAuth0', () => {
  cy.request('POST', Cypress.env('token_url'), {
    grant_type: 'password',
    username: Cypress.env('auth_username'),
    password: Cypress.env('auth_password'),
    audience: Cypress.env('auth_audience'),
    scope: 'openid profile email',
    client_id: Cypress.env('auth_client_id'),
    client_secret: Cypress.env('auth_client_secret'),
  }).then((response) => {
    const { access_token, id_token, expires_in } = response.body;
    const auth0State = {
      nonce: '',
      state: 'some-random-state',
      timeout: 10000,
    };

    const callbackUrl = `http://localhost:3000/api/auth/callback?access_token=${access_token}&scope=openid&id_token=${id_token}&expires_in=${expires_in}&token_type=Bearer&state=${auth0State.state}`;
    cy.visit(callbackUrl, {
      onBeforeLoad(win) {
        win.document.cookie = 'com.auth0.auth.some-random-state=' + JSON.stringify(auth0State);
      },
      timeout: 10000,      
    });
  });
});
