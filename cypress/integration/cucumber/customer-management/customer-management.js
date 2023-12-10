import { Given, When, Then } from "cypress-cucumber-preprocessor/steps";

Given('I am on the "New Customer" page', () => {
  cy.visit("/new");
});

When("I create a new customer with the following details", (dataTable) => {
  let data = dataTable.rawTable.slice(1);
  cy.get('input[data-e2e="firstName"]').type(data[0][0]);
  cy.get('input[data-e2e="lastName"]').type(data[0][1]);
  cy.get('input[data-e2e="dateOfBirth"]').type(data[0][2]);
  cy.get('input[data-e2e="phoneNumber"]').type(data[0][3]);
  cy.get('input[data-e2e="email"]').type(data[0][4]);
  cy.get('input[data-e2e="bankAccountNumber"]').type(data[0][5], {
    force: true,
  });
  cy.get('button[type="submit"]').click();
});

Then('I should see "Customer created"', () => {
  cy.get(".mat-mdc-snack-bar-label").contains("Customer created");
});

Then("I should see the following customer details", (dataTable) => {
  let data = dataTable.rawTable.slice(1);
  cy.get('td[data-e2e="firstName"]').contains(data[0][0]);
  cy.get('td[data-e2e="lastName"]').contains(data[0][1]);
  cy.get('td[data-e2e="dateOfBirth"]').contains(data[0][2]);
  cy.get('td[data-e2e="phoneNumber"]').contains(data[0][3]);
  cy.get('td[data-e2e="email"]').contains(data[0][4]);
  cy.get('td[data-e2e="bankAccountNumber"]').contains(data[0][5]);
});

When('I visit the "New Customer" page', () => {
  cy.visit("/new");
});

Then(/I should see "(.*?)"/, (message) => {
  cy.get(".mat-mdc-snack-bar-label").contains(message);
});

When('I go back to "Customer List" page', () => {
  cy.get('button[data-e2e="back-btn"]').click();
});

When(
  /I update the customer "(.*?)" with the following details/,
  (name, dataTable) => {
    cy.get('button[data-e2e="edit-btn"]').click();
    let data = dataTable.rawTable.slice(1);
    cy.get('input[data-e2e="firstName"]').clear().type(data[0][0]);
    cy.get('input[data-e2e="lastName"]').clear().type(data[0][1]);
    cy.get('input[data-e2e="dateOfBirth"]').clear().type(data[0][2]);
    cy.get('input[data-e2e="phoneNumber"]').clear().type(data[0][3]);
    cy.get('input[data-e2e="email"]').clear().type(data[0][4]);
    cy.get('input[data-e2e="bankAccountNumber"]').clear().type(data[0][5]);
    cy.get('button[type="submit"]').click();
  }
);

Then('I should see "Customer updated"', () => {
  cy.get(".mat-mdc-snack-bar-label").contains("Customer updated");
});

When(/I delete the customer "(.*?)"/, (name) => {
  cy.get('button[data-e2e="delete-btn"]').click();
  cy.get('button[data-e2e="accept-delete-btn"]').click();
});

Then('I should see "Customer deleted"', () => {
  cy.get(".mat-mdc-snack-bar-label").contains("Customer deleted");
});

Then(/I should not see customer with "(.*?)" email/, (email) => {
  cy.contains(email).should("not.exist");
});
