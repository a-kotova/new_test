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
        return this.buyCTA.click();
    }

    navToProductPage () {
        return this.searchResult.click();
    }

    getProductName (item) {
        cy.get('div[jsname="r4nke"] > h1').invoke('text').then((text) => {
            item['title'] = text;
        });
    }

    getProductPrice (item) {
        return cy.get('.is-price').first().invoke('text').then((text) => {
            item['price'] = parseFloat(text.replace('$', ''));
        });
    }

    buyAnyColor (item) {
        cy.contains("Pick your color").should("be.visible");
        this.activeColors.then(colorContainers => {
            cy.wrap(chance.pickone(colorContainers)).then((colorContainer) => {
                cy.wrap(colorContainer).find('.mqn-product-collection__card__headline').invoke('text').then((text) => {
                    item['color'] = text;
                    cy.log(item.color)
                })
                cy.wrap(colorContainer).find('div.mqn-product-collection__card__buttons > button').click()
            })
        })
    }

    buyProduct(product, item) {
        this.clickBuyCTA().then(() => {
            if(product.color) {
                this.buyAnyColor(item)
            }
        })
    }
}
export default new Store ();
