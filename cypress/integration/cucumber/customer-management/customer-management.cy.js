import { Given, When, Then } from "cypress-cucumber-preprocessor/steps";
import { getElement } from "../../../utils/test.util";

Given('I am on the "New Customer" page', () => {
  cy.visit("/new");
});

When("I create a new customer with the following details", (dataTable) => {
  let data = dataTable.rawTable.slice(1);
  const getInput = getElement("input");
  getInput("firstName").type(data[0][0]);
  getInput("lastName").type(data[0][1]);
  getInput("dateOfBirth").type(data[0][2]);
  getInput("phoneNumber").type(data[0][3]);
  getInput("email").type(data[0][4]);
  getInput("bankAccountNumber").type(data[0][5], {
    force: true,
  });

  cy.get('button[type="submit"]').click();
});

Then('I should see "Customer created"', () => {
  cy.get(".mat-mdc-snack-bar-label").contains("Customer created");
});

Then("I should see the following customer details", (dataTable) => {
  let data = dataTable.rawTable.slice(1);
  const getTableCell = getElement("td");
  getTableCell("firstName").contains(data[0][0]);
  getTableCell("lastName").contains(data[0][1]);
  getTableCell("dateOfBirth").contains(data[0][2]);
  getTableCell("phoneNumber").contains(data[0][3]);
  getTableCell("email").contains(data[0][4]);
  getTableCell("bankAccountNumber").contains(data[0][5]);
});

When('I visit the "New Customer" page', () => {
  cy.visit("/new");
});

Then(/I should see "(.*?)"/, (message) => {
  cy.get(".mat-mdc-snack-bar-label").contains(message);
});

When('I go back to "Customer List" page', () => {
  getElement("button")("back-btn").click();
});

When(
  /I update the customer "(.*?)" with the following details/,
  (name, dataTable) => {
    getElement("button")("edit-btn").click();

    let data = dataTable.rawTable.slice(1);
    const getInput = getElement("input");
    getInput("firstName").clear().type(data[0][0]);
    getInput("lastName").clear().type(data[0][1]);
    getInput("dateOfBirth").clear().type(data[0][2]);
    getInput("phoneNumber").clear().type(data[0][3]);
    getInput("email").clear().type(data[0][4]);
    getInput("bankAccountNumber").clear().type(data[0][5]);

    cy.get('button[type="submit"]').click();
  }
);

Then('I should see "Customer updated"', () => {
  cy.get(".mat-mdc-snack-bar-label").contains("Customer updated");
});

When(/I delete the customer "(.*?)"/, (name) => {
  getElement("button")("delete-btn").click();
  getElement("button")("accept-delete-btn").click();
});

Then('I should see "Customer deleted"', () => {
  cy.get(".mat-mdc-snack-bar-label").contains("Customer deleted");
});

Then(/I should not see customer with "(.*?)" email/, (email) => {
  cy.contains(email).should("not.exist");
});
