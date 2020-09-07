import CurrencyExchange from "../page-objects/CurrencyExchange";

    it('Navigate to the site', () => {
        cy.fixture('currency').then (currency => {
            let random = CurrencyExchange.selectRandomCurrency(currency);
            CurrencyExchange.open();
            CurrencyExchange.convertFrom.type(`${currency.base}{enter}`);
            CurrencyExchange.convertTo.type(`${random[0]}{enter}`);
            CurrencyExchange.submitForm();
            CurrencyExchange.result.should('have.text', random[1]);
        });
    });