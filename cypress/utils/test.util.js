export function getElement(tagName) {
  return (testId) => {
    return cy.get(`${tagName}[data-e2e="${testId}"]`);
  };
}
