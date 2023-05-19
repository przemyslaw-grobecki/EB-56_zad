import React from 'react'
import ProductCard from './ProductCard'

describe('<ProductCard />', () => {
  it('Should render all information and buttons', () => {
    const addProductStub = cy.spy();
    const removeProductFromBasket = cy.spy();
    
    const productStub = {
      ID: "1",
      Name: 'Test product',
      Category: "test",
      ImageURL: "http://testimageurl",
      Price: 10,
      Quantity: 99  
    }

    cy.mount(<ProductCard 
      addProductToBasket={addProductStub}
      removeProductFromBasket={removeProductFromBasket}
      product={productStub}/>)
    
    
    cy.contains(productStub.Name);
    cy.contains(productStub.Price);
    cy.contains(productStub.Quantity);
    cy.contains(productStub.Category);
    cy.contains("Add to cart").should("be.visible")
      .and("be.enabled");
    cy.contains("Remove from cart").should("be.visible")
      .and("be.enabled");
    cy.get('[role="img"]').should("be.visible")
      .and("have.css", "background-image", `url("${productStub.ImageURL}/")`);
  });

  it('Should invoke addProductToBasket when add to cart button clicked', () => {
    const addProductStub = cy.spy();
    
    const productStub = {
      ID: "1",
      Name: 'Test product',
      Category: "test",
      ImageURL: "http://testimageurl",
      Price: 10,
      Quantity: 99  
    }

    cy.mount(<ProductCard 
      addProductToBasket={addProductStub}
      removeProductFromBasket={() => {}}
      product={productStub}/>)
    
    cy.contains("Add to cart").click()
      .then(() => {
        expect(addProductStub).to.be.calledWith(productStub);
      });
  });

  it('Should invoke removeProductFromBasket when remove from cart button clicked', () => {
    const removeProductFromBasketStub = cy.spy();
    const addProductStub = cy.spy();

    const productStub = {
      ID: "1",
      Name: 'Test product',
      Category: "test",
      ImageURL: "http://testimageurl",
      Price: 10,
      Quantity: 99  
    }

    cy.mount(<ProductCard 
      addProductToBasket={addProductStub}
      removeProductFromBasket={removeProductFromBasketStub}
      product={productStub}/>)
    
    cy.contains("Add to cart").click()
      .then(() => {
        cy.contains("Remove from cart").click()
          .then(() => {
            expect(removeProductFromBasketStub).to.be.calledWith(productStub);
          });
      });
  });

  it('Should not invoke removeProductFromBasket when remove from cart button clicked and there is max quantity', () => {
    const removeProductFromBasketStub = cy.spy();
    const addProductStub = cy.spy();

    const productStub = {
      ID: "1",
      Name: 'Test product',
      Category: "test",
      ImageURL: "http://testimageurl",
      Price: 10,
      Quantity: 99  
    }

    cy.mount(<ProductCard 
      addProductToBasket={addProductStub}
      removeProductFromBasket={removeProductFromBasketStub}
      product={productStub}/>)

    cy.contains("Remove from cart").click()
      .then(() => {
        expect(removeProductFromBasketStub).not.to.be.called;
      });
  });
})