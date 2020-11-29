class Cart {
    get productName () {
        return cy.get('.cart-lineitem-title .roboto-header-text-9');
    }

    get productPrice () {
        return cy.get('div[jsname="dDu6Ab"]');
    }

    get totalPrice () {
        return cy.get('span[jsname="hMdCqe"]');
    }

    get totalQty () {
        return cy.get('span[jsname="Nz8knb"]');
    }

    get removeBtn () {
        return cy.get('button[jsname="uXqWSe"]');
    }

    get cartTitle () {
        return  cy.get('.your-cart-is-empty')
    }

    removeProduct() {
        this.removeBtn.click();
    }

    navigateToCartDirectly() {
        return cy.visit('/cart')
    }

    get itemsQty () {
        return cy.get('span[jsname="tTRCb"]').first();
    }

    countTotalPrice (array) {
        let prices = array.map(product => product.price*product.cart_qty);
        let total = prices.reduce((sum, current) => sum + current)
        total = +total.toFixed(2)
        return total
    }

    increaseProductsQty (array) {
        array.forEach((product, index) => {
            cy.get('select').eq(index).find('option:not([selected="true"])').invoke('text').then((options) => {
                let selected = chance.pickone(options)
                array[index].cart_qty = selected
                cy.get('select').eq(index).select(selected)
                cy.wait(Cypress.env('cartReloadTimeout'))
            })
        })
    }

    getTotalPrice() {
        return this.totalPrice.invoke('text').then((value) => {
            let price = parseFloat(value.replace('$', ''));
            return cy.wrap(price)
        })
    }

    getItemByUrl (url) {
        return cy.get(`a[href="${url}"]`);
    }
}

export default new Cart ();