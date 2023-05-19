/// <reference  types="cypress" />"
describe('template spec', () => {

  beforeEach(() => {
      cy.visit('http://localhost:5173/');
  })

  it('Add product to cart', () => {
    cy.contains("Amount in stock: ")
      .then(element => {
        const amountBeforeIncrease = element.text().split(": ")[1];
        cy.wrap(amountBeforeIncrease).as("amountBeforeIncrease");
        cy.contains("Add to cart")
        .click() //1!
        .click() //2!
        .click() //3!
          .then(() => {
            cy.contains("Amount in stock: ")
              .then(element => {
                const amountAfterIncrease = element.text().split(": ")[1];
                cy.wrap(amountAfterIncrease).as("amountAfterIncrease");
                expect(amountAfterIncrease).to.equal(
                  (Number(amountBeforeIncrease) - 3).toString()
                );
              })
          })
      })
  });

  it('Remove product from cart', () => {
    cy.contains("Amount in stock: ")
      .then(element => {
        const amountBeforeIncrease = element.text().split(": ")[1];
        cy.wrap(amountBeforeIncrease).as("amountBeforeIncrease");
        cy.contains("Add to cart")
        .click() //1!
        .click() //2!
        .click() //3!
          .then(() => {
            cy.contains("Remove from cart")
            .click() //1!
            .click() //2!
              .then(() => {
                cy.contains("Amount in stock: ")
                .then(element => {
                  const amountAfterIncrease = element.text().split(": ")[1];
                  cy.wrap(amountAfterIncrease).as("amountAfterIncrease");
                  expect(amountAfterIncrease).to.equal(
                    (Number(amountBeforeIncrease) - 1).toString()
                  );
                })
              })
          })
      })
  });

  it('Add different products to cart', () => {
    cy.get('.MuiListItem-root').each(($el, index, $list) => {
      cy.wrap($el).contains("Amount in stock: ")
        .then(element => {
          const amountBeforeIncrease = element.text().split(": ")[1];
          cy.wrap(amountBeforeIncrease).as(`amountBeforeIncrease${index}`);
        })
      cy.wrap($el).contains("Add to cart")
        .click() //1!
        .click() //2!
        .click() //3!
    })
      .then(() => {
        cy.get('.MuiListItem-root').each(($el, index, $list) => {
          cy.wrap($el).contains("Amount in stock: ")
            .then(element => {
              const amountAfterIncrease = element.text().split(": ")[1];
              cy.get("@amountBeforeIncrease" + index).then(amountBeforeIncrease => {
                expect(amountAfterIncrease).to.equal(
                  (Number(amountBeforeIncrease) - 3).toString()
                );
              })
            })
        })
      })
  });

  it('Remove different products from cart', () => {
    cy.get('.MuiListItem-root').each(($el, index, $list) => {
      cy.wrap($el).contains("Amount in stock: ")
      .then(element => {
        const amountBeforeIncrease = element.text().split(": ")[1];
        cy.wrap(amountBeforeIncrease).as(`amountBeforeIncrease${index}`);
      })
      cy.wrap($el).contains("Add to cart")
        .click() //1!
        .click() //2!
        .click() //3!
    })
      .then(() => {
        cy.get('.MuiListItem-root').each(($el, index, $list) => {
          cy.wrap($el).contains("Remove from cart")
            .click() //1!
            .click() //2!
            .then(() => {
              cy.wrap($el).contains("Amount in stock: ")
                .then(element => {
                  const amountAfterIncrease = element.text().split(": ")[1];
                  cy.get("@amountBeforeIncrease" + index).then(amountBeforeIncrease => {
                    expect(amountAfterIncrease).to.equal(
                      (Number(amountBeforeIncrease) - 1).toString()
                    );
                  })
                })
            })
        })
      })
  });

  it('Open empty cart and close it', () => {
    cy.get('.MuiBox-root > .MuiButtonBase-root')
      .should('be.visible')
      .and('be.enabled')
      .click()
      .then(() => {
        cy.contains("Are You sure, You want to confirm your order?");
        cy.contains("By clicking confirm You will be redirected to your banking service to perform the payment. The list of items in basket:");     
        cy.contains("Abort")
          .should('be.visible')
          .and('be.enabled')
          .click()
      })
  });

  it('Open non empty cart and close it', () => {
    cy.contains("Add to cart")
      .should('be.visible')
      .and('be.enabled')
      .click()
      .then(() => {
        cy.get('.MuiBox-root > .MuiButtonBase-root')
          .should('be.visible')
          .and('be.enabled')
          .click()
          .then(() => {
            cy.contains("Are You sure, You want to confirm your order?");
            cy.contains("By clicking confirm You will be redirected to your banking service to perform the payment. The list of items in basket:");
            cy.contains(" in quantity of ")
            cy.contains(" for total of ")
            cy.contains("$")
            cy.contains("Abort")
              .should('be.visible')
              .and('be.enabled')
              .click()
          })
      })
  });

  it("Open empty cart and close it, clicking anywhere outside the popup", () => {
    cy.get('.MuiBox-root > .MuiButtonBase-root')
    .should('be.visible')
    .and('be.enabled')
    .click()
    .then(() => {
      cy.contains("Are You sure, You want to confirm your order?");
      cy.contains("By clicking confirm You will be redirected to your banking service to perform the payment. The list of items in basket:");     
      cy.get(".MuiDialog-container").click("left")
        .then(() => {
          cy.contains("Are You sure, You want to confirm your order?").should('not.be.visible');
          cy.contains("By clicking confirm You will be redirected to your banking service to perform the payment. The list of items in basket:").should('not.be.visible'); 
        })
    })
  });

  it('Open non empty cart and close it, clicking anywhere outside the popup', () => {
    cy.contains("Add to cart")
      .should('be.visible')
      .and('be.enabled')
      .click()
      .then(() => {
        cy.get('.MuiBox-root > .MuiButtonBase-root')
          .should('be.visible')
          .and('be.enabled')
          .click()
          .then(() => {
            cy.contains("Are You sure, You want to confirm your order?");
            cy.contains("By clicking confirm You will be redirected to your banking service to perform the payment. The list of items in basket:");
            cy.contains(" in quantity of ")
            cy.contains(" for total of ")
            cy.contains("$")
            cy.get(".MuiDialog-container").click("left")
              .then(() => {
                cy.contains("Are You sure, You want to confirm your order?").should('not.be.visible');
                cy.contains("By clicking confirm You will be redirected to your banking service to perform the payment. The list of items in basket:").should('not.be.visible'); 
              })
          })
      })
  });
})