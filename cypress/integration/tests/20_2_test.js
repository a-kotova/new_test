import Store from '../page-objects/GoogleStore'
import Cart from "../page-objects/GoogleCart";

describe('User able to change products quantity', () => {
    before(() => {
        cy.fixture('singleColorProducts.json').then(function (products)  {
            products.forEach(product => {
                cy.log('WHEN user navigates to the product page')
                Store.openProductPage(product.url)
                Store.getTitle().then((title) => {
                    product.title = title
                })
                Store.getPrice().then((price) => {
                    product.price = price
                })
                cy.log('AND adds the product to the cart')
                Store.clickBuyCTA()
                cy.log('THEN the product is added to the cart properly')
                Cart.getItemByUrl(product.url).should('exist')
            })
            cy.wrap(products).as('products')
        })
    })
    it('User is able to change products quantity', () => {
        cy.log('WHEN user navigates to the cart AND cart has previously added products')
        Cart.navigateToCartDirectly().then(function ()  {
            cy.get('@products').then((products) => {
                products.forEach((product, index) => {
                    cy.log('AND each added product is correct')
                    Cart.getProductName.eq(index).then(($name) => {
                        expect($name).to.contain( `${products[index].title}`)
                    });
                    cy.log('AND price of each added product is correct')
                    Cart.getProductPrice.eq(index).then(($value) => {
                        let price = $value.text();
                        price = parseFloat(price.replace('$', ''));
                        expect(price).to.eq(products[index].price);
                    });
                })
                cy.log("WHEN user changes product's quantity" )
                Cart.increaseProductsQuantity(products)
                cy.log('THEN total price is re-calculated properly' )
                Cart.getTotalPrice().then((total) => {
                    expect(total).to.eq(Cart.countTotalPrice(products))
                })
            })
        })
    })
})