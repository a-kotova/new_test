import {isSuperSet, Union, Intersection, Difference} from '../utils/helpers.js';
import Chance from 'chance';
const chance = new Chance();

// 12.1.1 Create set of values
let currencySet = new Set(['USD', 'RUB', 'BYN']);

it('12.1.2 Print set', () => {
    currencySet.forEach(currency => {
        cy.log(currency)
    });
});

it('12.1.3 Add new values to the set', () => {
    currencySet.add('USD').add('EUR').add('BYN').add('PLN').add('GBP');
    currencySet.forEach(currency => {
        cy.log(currency)
    });
});

it('12.1.4 Check if set has particular value', () => {
    cy.log("Set has USD value: " + currencySet.has('USD'));
    currencySet.delete('USD');
    cy.log("Set has USD value: " + currencySet.has('USD'));
});

it('12.1.5 Return random value(s)', () => {
    cy.log(chance.pickone([...currencySet]));
    cy.log(chance.pickset([...currencySet], chance.integer({min: 1, max: currencySet.size})));
});

it('12.1.6 Custom functions implementation', () => {
    let setA = new Set(['USD', 'GBP', 'PLN', 'EUR']);
    let setB = new Set(['GBP', 'PLN']);
    let setC = new Set(['PLN', 'EUR', 'BYN', 'RUB']);
    cy.log(isSuperSet(setA, setB));
    cy.log(Union(setB, setC));
    cy.log(Intersection(setA, setC));
    cy.log(Difference(setA, setC));
});

