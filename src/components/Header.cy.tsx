/// <reference  types="cypress" />"

import React from 'react'
import Header from './Header'

describe('<Header />', () => {
  let isOpened = false;

  beforeEach(() => {
    cy.mount(<Header openBasket={() => {isOpened = true}}/>)
  })

  afterEach(() => {
    isOpened = false;
  })

  it('Should render header with shop title and basket button present', () => {
    cy.get('.MuiToolbar-root').should('contain.text', 'Przemek Shop');
    cy.get('.MuiToolbar-root').should('contain.html', 'button');
    cy.get('.MuiBox-root > .MuiButtonBase-root').should('be.visible')
      .and('be.enabled');
  });

  it('Should open basket when basket button is clicked', () => {
    cy.get('.MuiBox-root > .MuiButtonBase-root').click().then(() => expect(isOpened).to.be.true);
  });

  it('Should render header with rgb(46, 59, 69) background color', () => {
    cy.get('.MuiPaper-root').should('have.css', 'background-color', 'rgb(46, 59, 69)');
  });
})