before(() => {
    cy.request('https://storage.googleapis.com/mannequin/2018/data/productwall/accessories/en_us.json?c=1571310916').its('body').as("payload")
})

it('19.2 cy.request is in "Before" block', function ()  {
    let items = this.payload.products;
    cy.log('Total amount of products is ' + items.length);
    cy.log(items[0]);
});

it('19.1 cy.request and code are both in "it" block', () => {

    cy.request('https://storage.googleapis.com/mannequin/2018/data/productwall/accessories/en_us.json?c=1571310916').then((response) => {
        cy.wrap(response.body).as("payload");
    })

    cy.get("@payload").then(payload => {
        cy.log('Total amount of products is ' + payload.products.length);
        cy.log(payload.products[0]);
    })
});

