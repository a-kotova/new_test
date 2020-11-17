import Store from '../page-objects/GoogleStore';
import Cart from '../page-objects/GoogleCart';

describe('User adds products to cart', () => {
  it('US_1: User is able to add single and multiple color product to the cart', () => {
    cy.fixture('products').then(scope => {
      scope.goods.forEach(product => {
        let item = {};
        cy.log('GIVEN user is at Accessories page');
        Store.open();
        cy.log('WHEN user performs search');
        Store.searchIcon.click();
        Store.searchInput.type(`${product.name}{enter}`);
        cy.log('AND adds product to the cart');
        Store.navToProductPage();
        Store.getProductName(item);
        Store.getProductPrice(item).then(() => {
          Store.buyProduct(product, item);
          cy.log('THEN added product is displayed in the cart');
          Cart.productName.should('include.text', item.title);
          if (item.color) {
            cy.log('AND product has correct color');
            Cart.productName.should('include.text', item.color);
          }
          cy.log('AND product quantity is correct');
          Cart.totalQty.should('have.text', '(1 item)');
          cy.log('AND product price is correct');
          Cart.productPrice.should(($value) => {
            let price = $value.text();
            price = parseFloat(price.replace('$', ''));
            expect(price).to.eq(item.price);
          });
          cy.log('AND total price is correct');
          Cart.totalPrice.should(($value) => {
            let price = $value.text();
            price = parseFloat(price.replace('$', ''));
            expect(price).to.eq(item.price);
          });
        });
        cy.log('WHEN user deletes product form the cart');
        Cart.removeProduct();
        cy.log('THEN cart is empty');
        cy.get('body').then(() => {
          Cart.cartTitle.should('have.text', 'Your cart is empty');
        });
      });
    });
  });
});
