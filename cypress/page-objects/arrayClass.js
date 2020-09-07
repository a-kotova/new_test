import Chance from "chance";
const chance = new Chance();
class Array {

    //prints planets
    printPlanets(array) {
        array.forEach(function (planet) {
            cy.log(`planet: ${planet.planet}, radius: ${planet.radius}, density: ${planet.density}, distance:  ${planet.distance}`);
        });
    }

    //filters planets with distance greater then value
    getPlanetsWithDistance (array, value) {
        array = array.filter(function (planet) {
            return planet.distance > value;
        })
        return array;
    }

    //sorts array by particular property
    sortByProperty(array, propertyVal) {
        function sortProp(a, b) {
            let property = propertyVal;
            const valA = a[property];
            const valB = b[property]
            let comparison = 0;
            if (valA > valB) {
                comparison = 1;
            } else if (valA < valB) {
                comparison = -1;
            }
            return comparison;
        }
        return array.sort(sortProp);
    }
}
export default new Array();