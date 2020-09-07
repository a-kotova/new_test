import Chance from "chance";
const chance = new Chance();

class CurrencyExchange {
    open () {
        cy.visit('');
    }

    get convertFrom () {
        return cy.get('input[aria-label="Currency to convert from"]');
    }

    get convertTo () {
        return cy.get('input[aria-label="Currency to convert to"]');
    }

    submitForm () {
        cy.get('button[data-test-id="converter-submit-button"]').click();
    }

    get result () {
        return cy.get('span[class="converterresult-toAmount"]');
    }

    selectRandomCurrency(object) {
        let array = object.rates;
        let random = chance.pickone(array);
        array = [random.shortName, random.rate]
        return array;
    }

}

export default new CurrencyExchange();