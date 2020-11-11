import Chance from 'chance';
const chance = new Chance();

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

    get activeColors () {
        return cy.get('.mqn-button:not([disabled="disabled"])')
          .parents('.mqn-product-collection__card__meta');
    }

    clickBuyCTA () {
        this.buyCTA.click();
    }

    getProductName (item) {
        cy.get('div[jsname="r4nke"] > h1').invoke('text').then((text) => {
            item['title'] = text;
        });
    }

    getProductPrice (item) {
        cy.get('.is-price').first().invoke('text').then((text) => {
            item['price'] = parseFloat(text.replace('$', ''));
        });
    }

    getColorTitle (item, index) {
        cy.get('.mqn-product-collection__card__headline').eq(index).invoke('text').then((text) => {
            item['color'] = text;
        })
    }

    getColorPrice (item, index) {
        cy.get('.is-price').eq(index).invoke('text').then((text) => {
            item['price'] = parseFloat(text.replace('$', ''));
        })
    }

    buyColor (index) {
        cy.get('.mqn-button').eq(index).click();
    }

}
export default new Store ();
