import Store from '../page-objects/GoogleStore'
import Cart from "../page-objects/GoogleCart";

describe('User able to change products quantity', () => {
    before(() => {
        cy.fixture('singleColorProducts.json').then(function (products)  {
            this.products = products
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
        })
    })
    it('User is able to change products quantity', () => {
        cy.log('WHEN user navigates to the cart AND cart has previously added products')
        Cart.navigateToCartDirectly().then(function ()  {
            cy.log('AND total of products is correct')
            Cart.itemsQty.should('have.text', `${this.products.length}`)
            cy.log('AND each added product is correct')
            cy.log('AND price of each added product is correct')
            this.products.forEach((product, index) => {
                Cart.productName.eq(index).should('have.text', `${this.products[index].title}`)
                Cart.productPrice.eq(index).should(($value) => {
                    let price = $value.text();
                    price = parseFloat(price.replace('$', ''));
                    expect(price).to.eq(this.products[index].price);
                });
            })
            cy.log('AND total price is correct')
            Cart.getTotalPrice().then((total) => {
                expect(total).to.eq(Cart.countTotalPrice(this.products))
            })
            cy.log("WHEN user changes product's quantity" )
            Cart.increaseProductsQty(this.products)
            cy.log('THEN total price is re-calculated properly' )
            Cart.getTotalPrice().then((total) => {
                expect(total).to.eq(Cart.countTotalPrice(this.products))
            })
        })
    })
})