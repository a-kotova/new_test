import Chance from 'chance';
import Store from '../page-objects/GoogleStore';
import Cart from '../page-objects/GoogleCart';
const chance = new Chance();

describe ('User adds products to cart', () => {

    it('US_1: User is able to add single and multiple color product to the cart', () => {

        cy.fixture('products').then(scope => {
            scope.goods.forEach(product => {

                cy.log('GIVEN user is at Accessories page');
                Store.open();
                cy.log('WHEN user performs search');
                Store.searchIcon.click();
                Store.searchInput.type(`${product.name}{enter}`);
                cy.log('AND adds product to the cart');
                Store.searchResult.click();
                getProductsData(product).then(productData => {
                    if (productData.isMulticolor) {
                        Store.buyColor(random);
                    } else {
                        Store.clickBuyCTA();
                    }
                });
                //
                // Store.clickBuyCTA();
                cy.log(item);
                cy.log(JSON.stringify(item))
                // cy.log('THEN added product is displayed in the cart');
                //     Cart.productName.should('include.text', item.name);
                //     if (item.color === undefined) {
                //     } else {
                //         cy.log('AND product has correct color');
                //         Cart.productName.should('include.text', item.color);
                //     }
                //     cy.log('AND product quantity is correct');
                //     Cart.totalQty.should('have.text', '(1 item)');
                //     cy.log('AND product price is correct');
                //     Cart.productPrice.should(($value) => {
                //         let price = $value.text();
                //         price = parseFloat(price.replace('$', ''));
                //         expect(price).to.eq(item.price)
                //     })
                //     cy.log('AND total price is correct');
                //     Cart.totalPrice.should(($value) => {
                //         let price = $value.text();
                //         price = parseFloat(price.replace('$', ''));
                //         expect(price).to.eq(item.price)
                //     })
                // });
                // Cart.removeProduct();
                // cy.get('body').then(($body) => {
                //     cy.get('.your-cart-is-empty').should('have.text', 'Your cart is empty');
                // })
            })
        })
    })
})

const getProductsData = (product) => {
    let item = { ...product };

    if (item.isMulticolor) {
        Store.getProductName(item);
        Store.clickBuyCTA();
        Store.activeColors.then(colors => {
            let random = chance.integer({min: 0, max: colors.length-1});
            Store.getColorTitle(item, random);
            Store.getColorPrice(item, random);
        })
    } else {
        Store.getProductName(item);
        Store.getProductPrice(item);
    }

    return item;
};