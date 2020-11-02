import Store from "../page-objects/GoogleStore";

describe('Test 2', () => {
    let item = {};
    before(() => {
    cy.fixture('products').then(scope => {
        scope.goods.forEach(products => {
            cy.visit('https://store.google.com/us' + `${products.url}`);
            Store.proceedToCart(item);
            cy.wait(3000);
            cy.get('body').then(($body) => {
                if($body.find('div.mqn-headline__title').text()==='Pick your color') {
                    Store.selectColor(item);
                }
            })
        })
    })
    })
    it('Task2', () => {
        cy.visit('https://store.google.com/cart');
    })
})