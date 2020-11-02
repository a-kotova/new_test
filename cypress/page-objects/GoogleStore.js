import Chance from 'chance';
const chance = new Chance();
import item from '../tests/20_1_test';

class Store {
    open () {
        cy.visit('https://store.google.com/us/collection/accessories_wall?hl=en-US')
    }

    get searchIcon () {
        return cy.get('.header-search-icon');
    }

    get searchInput () {
        return cy.get('input[aria-label="Search Google Store"]');
    }

    get searchResult () {
        return cy.get('.card-link-target').first();
    }

    get buyCTA () {
        return cy.get('.primary.transaction.button').first();
    }

    get Colors () {
        return cy.get('.mqn-product-collection__card__meta');
    }

    get Cart () {
        return cy.get('[data-default-aria-label]');
    }

    get goToCart () {
        return cy.get('.mdc-button__ripple').first();
    }

    proceedToCart (item) {
        cy.get('div[jsname="r4nke"] > h1').invoke('text').then((text) => {
            item.name = text;
            cy.writeFile('cypress/fixtures/item.json', item);
        });
        cy.get('.is-price').first().invoke('text').then((text) => {
            item.price = parseFloat(text.replace('$', ''));
            cy.writeFile('cypress/fixtures/item.json', item);
        });
        this.buyCTA.click();
        return item;
    }

    selectColor (item) {
        this.Colors.then(colorOptions => {
            cy.get('.navigation > div').invoke('text').then((text) => {
                item.name = text;
                cy.writeFile('cypress/fixtures/item.json', item);
            });
            cy.wrap(chance.pickone(colorOptions)).then(selectedColor => {
                cy.wrap(selectedColor).find('.mqn-product-collection__card__header > .mqn-product-collection__card__headline').invoke('text').then((text) => {
                    item.color = text;
                    cy.writeFile('cypress/tests/task20', item);
                });
                cy.wrap(selectedColor).find('.mqn-product-collection__card__price > span').invoke('text').then((text) => {
                    item.price = parseFloat(text.replace('$', ''));
                    cy.writeFile('cypress/fixtures/item.json', item);
                });
                cy.wrap(selectedColor).find('.mqn-product-collection__card__buttons > button').click();
            });
        })
        return item;
    }
}
export default new Store ();


//  () {
//
//     cy.find('.is-price').first().invoke('text').then((text) => {
//         item.price = text;
//         cy.writeFile('../tests/task20', item);
//     });
// }
//
// selectSize (item) {
//     this.Sizes.then(sizeOptions => {
//         cy.wrap(chance.pickone(sizeOptions)).then(selectedSize => {
//             cy.wrap(selectedSize).find('.mqn-lobby__card__header > .mqn-lobby__card__subtitle').invoke('text').then((text) => {
//                 item.size = text;
//                 cy.writeFile('../tests/task20', item);
//             });
//             cy.wrap(selectedSize).find('.mqn-lobby__card__price > span > span').invoke('text').then((text) => {
//                 item.price = text;
//                 cy.writeFile('../tests/task20', item);
//             });
//             cy.wrap(selectedSize).find('.mqn-lobby__card__buttons > button').click();
//         });
//     });
//     return item;
// }
//
// get Name () {
//     return cy.get('div[jsname="r4nke"] > h1');
// }
//
// get Price () {
//     return cy.get('.is-price').first();
// }
//
// get Sizes () {
//     return cy.get('.mqn-lobby__card__meta');
// }
//
// get searchResultTitle () {
//     return cy.get('.card-link-target .product-text').first();
// }
