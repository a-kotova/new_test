let planetsMap = new Map();
planetsMap.set("Mercury", {radius: 2440, density: 5.43, distance: 0.395});
planetsMap.set("Venus", {radius: 6052, density: 5.24, distance: 0.723});
planetsMap.set("Earth", {radius: 6378, density: 5.52, distance: 1});
planetsMap.set("Mars", {radius: 3396, density: 3.93, distance: 1.53});
planetsMap.set("Jupiter", {radius: 71492, density: 1.33, distance: 5.21});
planetsMap.set("Saturn", {radius: 60268, density: 0.69, distance: 9.551});
planetsMap.set("Uranus", {radius: 25559, density: 1.27, distance: 19.213});
planetsMap.set("Neptune", {radius: 24764, density: 1.64, distance: 30.07});

it('12.3.1 Return new map', () => {
    cy.log(planetsMap);
});

it('12.3.2 Print data as a strings', () => {
    planetsMap.forEach((value, key) => {
        cy.log(key + ': ' + Object.keys(value).map(objKey => objKey + ':' + value[objKey]).join(', '))
    });
});

it('12.3.3 Return data about particular planet', () => {
    cy.log(planetsMap.get("Saturn"));
});

it('12.3.4 Return size of map', () =>{
    cy.log('Map size is: ' + planetsMap.size);
});

let planetsSet = new Set(['Mercury', 'Not Mercury']);

it('12.3.5 Check if map has values from set', () => {
    planetsSet.forEach(item => {
        cy.log('Such planet is present in map: ' + planetsMap.has(item));
    });
});

it('12.3.6 Delete element with particular key', () => {
    planetsMap.delete('Uranus');
    planetsMap.forEach((value, key) => {
        cy.log(key + ': ' + Object.keys(value).map(objKey => objKey + ':' + value[objKey]).join(', '))
    });
});

it('12.3.7 Merge two maps', () => {
    let newMap = new Map();
    newMap.set("newUranus", {radius: 25559, density: 1.27, distance: 19.213});
    newMap.set("Earth", {radius: 6378, density: 5.52, distance: 1});
    newMap.set("newPlanet1", {radius: 2354, density: 2.28, distance: 1.17});
    newMap.set("newPlanet2", {radius: 17000, density: 21.31, distance: 15.88});
    let merged = new Map([...planetsMap, ...newMap])
    merged.forEach((value, key) => {
        cy.log(key + ': ' + Object.keys(value).map(objKey => objKey + ':' + value[objKey]).join(', '))
    });
});

let onePlanet = {planet: "Mercury", radius: 2440, density: 5.43, distance: 0.395};
it('12.3.8 Print properties from object', () =>{
    for (let key in onePlanet) {
        cy.log(key + ': ' + onePlanet[key]);
    }
});