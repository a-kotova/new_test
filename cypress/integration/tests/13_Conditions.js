import Chance from 'chance';
const chance = new Chance();

it('13.1 Check age using if', () => {
    let years = chance.age();
    if (years < 13) {
        cy.log(years + ' This is a child')
    } else if (years >= 13 && years < 20) {
        cy.log(years + ' This is a teen')
    } else if (years >= 20 && years < 55) {
        cy.log(years + ' This is an adult')
    } else {
        cy.log(years + ' This is a senior')
    }
});

it('13.2 Check age using case', () => {
    let years = chance.age();
    switch (true) {
        case years < 13 :
            cy.log(years + ' This is a child');
            break;
        case years >= 13 && years < 20 :
            cy.log(years + ' This is a teen');
            break;
        case years >= 20 && years < 55 :
            cy.log(years + ' This is an adult');
            break;
        default:
            cy.log(years + ' This is a senior');
    }
});

it('13.3 Check age using ternary operator', () => {
    let years = chance.age();
    (years < 13) ?
        cy.log(years + ' This is a child') :
        (years >= 13 && years < 20) ?
            cy.log(years + ' This is a teen') :
            (years >= 20 && years < 55) ?
                cy.log(years + ' This is an adult') :
                cy.log(years + ' This is a senior');
});