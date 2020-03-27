let nextPage = '';
let previousPage = '';
let planets = {};

fetch('https://swapi.co/api/planets/?page=1') // set the path; the method is GET by default,
                // but can be modified with a second parameter
.then((response) => response.json()) // parse JSON format into JS object
.then((data) => {
    // console.log(data)
    makeTable(data);
    nextPage = data.next;
    previousPage = data.previous;
});

function makeTable(obj) {
    for (let planet of obj.results) {
        let tr = document.createElement("tr");
        tr.innerHTML = `<td>${planet.name}</td> 
                        <td>${planet.diameter} km</td> 
                        <td>${planet.climate}</td> 
                        <td>${planet.terrain}</td> 
                        <td>${planet.surface_water} %</td> 
                        <td>${planet.population} people</td>`;
        document.querySelector('tbody').appendChild(tr);
    }
}