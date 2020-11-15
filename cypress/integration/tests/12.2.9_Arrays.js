import Array from '../page-objects/arrayClass';
let planets = [
    {planet: "Mercury", radius: 2440, density: 5.43, distance: 0.395},
    {planet: "Venus", radius: 6052, density: 5.24, distance: 0.723},
    {planet: "Earth", radius: 6378, density: 5.52, distance: 1},
    {planet: "Mars", radius: 3396, density: 3.93, distance: 1.53},
    {planet: "Jupiter", radius: 71492, density: 1.33, distance: 5.21},
    {planet: "Saturn", radius: 60268, density: 0.69, distance: 9.551},
    {planet: "Uranus", radius: 25559, density: 1.27, distance: 19.213},
    {planet: "Neptune", radius: 24764, density: 1.64, distance: 30.07}
];

it('12.2.1 Print Planets method', () => {
    Array.printPlanets(planets);
});

it('12.2.2 Add new property to the objects in array', () => {
    planets = planets.map(planet => {
        return {
            ...planet,
            solarSystem: true
        }
    });
    cy.log(planets);
});

it('12.2.2 Print each object from array', () => {
    planets.forEach(planet => {
        cy.log(JSON.stringify(planet));
    });
});

it('12.2.2 Print each object from array as a string', () => {
    planets.forEach(planet => {
        cy.log(Object.keys(planet).map(key => key + ':' + planet[key]).join(', '));});
});

it('12.2.3 Add new object to the array', () => {
    planets.push({planet: "SomeNewPlanet", radius: 24764, density: 1.64, distance: 30.07, solarSystem: false});
    cy.log(planets);
})

it('12.2.4 Sum planets radius', () => {
    let sum = planets.reduce(
        (accumulator, currentValue) => accumulator + currentValue.radius,
        0
    );
    cy.log("Radius = " + sum);
});

it('12.2.5 Filter planets where distance is greater then 5', () => {
    cy.log(Array.getPlanetsWithDistance(planets,5));
});

it('12.2.6 Delete object from array', () => {
    let i = planets.map(item => item.property).indexOf('SomeNewPlanet');
    planets.splice(i,1);
    cy.log(planets);
});

it('12.2.7 Sort by radius', () =>{
    cy.log(Array.sortByProperty(planets, 'radius'));
});

it('12.2.8 Sort by name', () => {
    cy.log(Array.sortByProperty(planets, 'planet'));
});

it('12.2.9 Print array length', () => {
    cy.log(planets.length);
});