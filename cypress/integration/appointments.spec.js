describe("Appointments", () => {
  it("books an interview", () => {
    cy.visit("/");
    cy.request("GET", "/api/debug/reset");
    cy.contains("[data-testid=day]", "Tuesday")
      .click()
      .get(":nth-child(1) > .appointment__add > .appointment__add-button")
      .click()
      .get("[data-testid=student-name-input]")
      .type("Matilda")
      .get(":nth-child(1) > .interviewers__item-image")
      .click()
      .get(".button--confirm")
      .click();
    cy.get('.appointment__card-left > h2.text--regular')
    .contains("Matilda")
  });
  it("edits an interview", () => {
    cy.visit("/");
    cy.request("GET", "/api/debug/reset");
    cy.contains("[data-testid=day]", "Tuesday")
      .click()
      .get(".appointment__actions-button").first()
      .click({force: true})
      .get("[data-testid=student-name-input]")
      .type("{selectall}")
      .type("{backspace}")
      .type("Hanya")
      .get(":nth-child(2) > .interviewers__item-image")
      .click()
      .get(".button--confirm")
      .click();
      cy.get('.appointment__card-left > h2.text--regular')
      .contains("Hanya");
  });
  it("cancels an interview", () => {
    cy.visit("/");
    cy.request("GET", "/api/debug/reset");
    cy.contains("[data-testid=day]", "Monday")
      .click()
      .get(".appointment__actions-button").last()
      .click({force: true})
      .get(".appointment__actions > :nth-child(2)")
      .click();
      
    cy.contains(".appointment__card--show", "Archie Cohen")
      .should("not.exist");
  });
});





