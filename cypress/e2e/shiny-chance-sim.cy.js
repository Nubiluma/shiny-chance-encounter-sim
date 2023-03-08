/// <reference types ="cypress" />

describe("shiny chance simulator", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("has no input elements checked initially", () => {
    cy.get("[data-cy=input-charm]").should("not.be.checked");
    cy.get("[data-cy=input-outbreak]").should("not.be.checked");
    cy.get("[data-cy=input-sandwich]").should("not.be.checked");
  });

  it("should not show result initially", () => {
    cy.get("[data-cy=results]").should("be.hidden");
  });

  it("should change odds-display-number on input check", () => {
    cy.get("[data-cy=odds-display]").should("contain.text", "4096");

    //shiny charm
    cy.get("[data-cy=input-charm]").check();
    cy.get("[data-cy=odds-display]").should("contain.text", "1365");

    cy.get("[data-cy=input-charm]").uncheck();
    cy.get("[data-cy=odds-display]").should("contain.text", "4096");

    //outbreak
    cy.get("[data-cy=input-outbreak]").check();
    cy.get("[data-cy=odds-display]").should("contain.text", "1365");

    cy.get("[data-cy=input-outbreak]").uncheck();
    cy.get("[data-cy=odds-display]").should("contain.text", "4096");

    //shiny boost sandwich
    cy.get("[data-cy=input-sandwich]").check();
    cy.get("[data-cy=odds-display]").should("contain.text", "1024");

    cy.get("[data-cy=input-sandwich]").uncheck();
    cy.get("[data-cy=odds-display]").should("contain.text", "4096");

    //charm + outbreak
    cy.get("[data-cy=input-charm]").check();
    cy.get("[data-cy=input-outbreak]").check();
    cy.get("[data-cy=odds-display]").should("contain.text", "819");

    cy.get("[data-cy=input-charm]").uncheck();
    cy.get("[data-cy=input-outbreak]").uncheck();
    cy.get("[data-cy=odds-display]").should("contain.text", "4096");

    //charm + sandwich
    cy.get("[data-cy=input-charm]").check();
    cy.get("[data-cy=input-sandwich]").check();
    cy.get("[data-cy=odds-display]").should("contain.text", "683");

    cy.get("[data-cy=input-charm]").uncheck();
    cy.get("[data-cy=input-sandwich]").uncheck();
    cy.get("[data-cy=odds-display]").should("contain.text", "4096");

    //outbreak + sandwich
    cy.get("[data-cy=input-outbreak]").check();
    cy.get("[data-cy=input-sandwich]").check();
    cy.get("[data-cy=odds-display]").should("contain.text", "683");

    cy.get("[data-cy=input-outbreak]").uncheck();
    cy.get("[data-cy=input-sandwich]").uncheck();
    cy.get("[data-cy=odds-display]").should("contain.text", "4096");

    //all
    cy.get("[data-cy=input-charm]").check();
    cy.get("[data-cy=input-outbreak]").check();
    cy.get("[data-cy=input-sandwich]").check();
    cy.get("[data-cy=odds-display]").should("contain.text", "512");

    cy.get("[data-cy=input-charm]").uncheck();
    cy.get("[data-cy=input-outbreak]").uncheck();
    cy.get("[data-cy=input-sandwich]").uncheck();
    cy.get("[data-cy=odds-display]").should("contain.text", "4096");
  });

  it("should show result on go-button click", () => {
    cy.get("[data-cy=run-button]").click();
    cy.get("[data-cy=results]").should("be.visible");
  });

  it("should hide results on input check", () => {
    cy.get("[data-cy=results]").invoke("show");
    cy.get("[data-cy=input-charm]").check();
    cy.get("[data-cy=results]").should("be.hidden");

    cy.get("[data-cy=results]").invoke("show");
    cy.get("[data-cy=input-outbreak]").check();
    cy.get("[data-cy=results]").should("be.hidden");

    cy.get("[data-cy=results]").invoke("show");
    cy.get("[data-cy=input-sandwich]").check();
    cy.get("[data-cy=results]").should("be.hidden");
  });
});
