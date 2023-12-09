import { When, Then, Given } from "cypress-cucumber-preprocessor/steps";

Given("context", () => {
  cy.visit("/");
});

When("event", () => {
  cy.get("button.add-btn").click();
});

Then("outcome", () => {
  cy.get("button.back-btn").should("have.length", 1);
});
