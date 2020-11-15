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
        return cy.get('.button-text');
    }

    get cartTitle () {
        return  cy.get('.your-cart-is-empty')
    }

    removeProduct() {
        this.removeBtn.click();
    }
}

export default new Cart ();