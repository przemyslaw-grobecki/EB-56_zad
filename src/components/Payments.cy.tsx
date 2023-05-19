import React from 'react'
import Payments from './Payments'

describe('<Basket />', () => {
  it('Should render empty list of basket items and two buttons', () => {
    cy.mount(<Payments basketItems={[]}
      basketOpen={true}/>);
    cy.contains("Are You sure, You want to confirm your order?");
    cy.contains("By clicking confirm You will be redirected to your banking service to perform the payment. The list of items in basket:")
    cy.contains("Abort").should("be.visible")
      .and("be.enabled");
    cy.contains("Confirm").should("be.visible")
      .and("be.enabled");;
  });

  it('Should render list of basket items and two buttons', () => {
    const firstProductName = "Potato";
    const firstProductPrice = 1.5;
    const firstProductQuantity = 2;

    const secondProductName = "Tomato";
    const secondProductPrice = 1.4;
    const secondProductQuantity = 4;
    
    cy.mount(<Payments
      basketOpen={true}
      basketItems={[
      {
        Name: firstProductName,
        Price: firstProductPrice,
        Quantity: firstProductQuantity,
      },
      {
        Name: secondProductName,
        Price: secondProductPrice,
        Quantity: secondProductQuantity,
      }
    ]}/>);

    cy.contains(`${firstProductName}`);
    cy.contains(`${firstProductQuantity}`);
    cy.contains(`${firstProductPrice*firstProductQuantity}`);

    cy.contains(`${secondProductName}`);
    cy.contains(`${secondProductQuantity}`);
    cy.contains(`${secondProductPrice*secondProductQuantity}`);
  });

  it('Should render no markers if there are no basket items', () => {
    cy.mount(<Payments basketItems={[]}
      basketOpen={true}/>);
    cy.get("li").should("not.exist");
  });

  it('Should render messages upon clicking the confirm button', () => {
    cy.mount(<Payments basketItems={[]}
      basketOpen={true}/>);
    cy.contains('Confirm').click();
    cy.contains('Thanks for buying in PrzemekShop');
    cy.contains('Your order is under service.');
    cy.contains('Ok').should("be.visible")
      .and("be.enabled");
  });
  
  it('Should invoke close function upon clicking the abort button', () => {
    const close = cy.stub();
    cy.mount(<Payments basketItems={[]}
      basketOpen={true}
      closeBasket={close}/>);
    cy.contains('Abort').click()
      .then(() => expect(close).to.be.called);
  });
});