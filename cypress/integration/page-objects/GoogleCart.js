class Cart {
    get getProductName () {
        return cy.get('.cart-lineitem-title .roboto-header-text-9');
    }

    get getProductPrice () {
        return cy.get('div[jsname="dDu6Ab"]');
    }

    get fetchTotalPrice () {
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

    countTotalPrice (products) {
        let prices = products.map(product => product.price * product.cart_qty);
        let total = prices.reduce((sum, current) => sum + current)
        total = Math.round(total * 100) / 100
        return total
    }

    increaseProductsQuantity (products) {
        products.forEach((product, index) => {
            cy.get('select').eq(index).find('option').then((options) => {
                let selected_quantity = chance.integer({min:2, max: options.length})
                products[index].cart_qty = selected_quantity
                cy.get('select').eq(index).select(`${selected_quantity}`)
                cy.contains(this.countTotalPrice(products)).should('be.visible')
            })
        })
    }

    getTotalPrice() {
        return this.fetchTotalPrice.invoke('text').then((value) => {
            let price = parseFloat(value.replace('$', ''));
            return cy.wrap(price)
        })
    }

    getItemByUrl (url) {
        return cy.get(`a[href="${url}"]`);
    }
}

export default new Cart ();