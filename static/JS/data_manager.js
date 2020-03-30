let nextPage = '';
let previousPage = '';
let planetsInventory = {};

fetch('https://swapi.co/api/planets/?page=1') // set the path; the method is GET by default,
                // but can be modified with a second parameter
.then((response) => response.json()) // parse JSON format into JS object
.then((myJson) => {
    writeTable(myJson);
    nextPage = myJson.next;
    previousPage = myJson.previous;
});

function writeTable(data) {
    for (let planet of data.results) {
        let tr = document.createElement("tr");
        let buttonResidents = '';
        // let buttonVote = '';
        planetsInventory[planet.name] = planet.residents;
        if (planet.residents.length > 0) {
            buttonResidents = `<td><button type="button"
                                class="btn btn-outline-dark"
                                id = "${planet.name}"
                                name = "${planet.name}"
                                data-toggle = "modal"
                                data-target = "#exampleModal">
                                ${planet.residents.length} residents(s)
                                </button></td>`;
        } else {
            buttonResidents = `<td>No known residents</td>`;
        }

        tr.innerHTML = `<td>${planet.name}</td> 
                        <td>${planet.diameter} km</td> 
                        <td>${planet.climate}</td> 
                        <td>${planet.terrain}</td> 
                        <td>${planet.surface_water} %</td> 
                        <td>${planet.population} people</td>
                        ${buttonResidents}`;
                        // ${buttonVote}
        document.querySelector('#tbody').appendChild(tr);
    }
    let buttonPress = document.getElementsByClassName("btn-outline-dark");
    for (let buttonPressed of buttonPress) {
        // if (buttonPressed.innerText === 'Vote') {
        //     buttonPressed.addEventListener('click', handleVoteButtonClick);
        // } else {
        // console.log(buttonPressed)
        buttonPressed.addEventListener('click', handleButtonClick);

        // }
    }
}

let next = document.getElementById("next");
next.addEventListener('click', loadNext)
let previous = document.getElementById("previous");
previous.addEventListener('click', loadPrevious);


function loadNext() {
    let page = nextPage;
    reWriteTable(page);
}

function loadPrevious() {
    let page = previousPage;
    if (page != null) {
        reWriteTable(page);
    }
}

function reWriteTable(page) {
    fetch(page)
        .then((response) => {return response.json();})
        .then((myJson) => {
            nextPage = myJson.next;
            previousPage = myJson.previous;
            document.querySelector('tbody').innerHTML = '';
            writeTable(myJson);
        });
}

function handleButtonClick() {
    console.log(this.id)
    let modalContainer = document.createElement('div');
    modalContainer.innerHTML = `
        <div class="modal" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria_hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">${this.id} residents</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Height</th>
                                    <th>Weight(mass)</th>
                                    <th>Skin color</th>
                                    <th>Hair color</th>
                                    <th>Eye color</th>
                                    <th>Birth year</th>
                                    <th>Gender</th>
                                </tr>
                            </thead>
                            <tbody id="tableResidentsBody">

                            </tbody>
                        </table>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismisss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
`;
    document.body.appendChild(modalContainer);
    console.log(modalContainer);
    document.getElementById('tableResidentsBody').innerHTML='';
    document.getElementById('exampleModalLabel').innerText = `${this.id} residents`;
    for (let i=0; i< planetsInventory[this.name].length; i++) {
        // console.log(planetsInventory[this.name].length);
        // console.log(planetsInventory[this.name][i])
        fetch(planetsInventory[this.name][i])

            .then((response) => {
                return response.json();
            })
            .then((myJson) => {
            console.log(myJson);
            addResidentsRow(myJson);
        });
    }
}

function addResidentsRow(myJson) {
    let residentsTr = document.createElement('tr');
    residentsTr.innerHTML = `
                <td>${myJson.name}</td>
                <td>${myJson.height}</td>
                <td>${myJson.mass}</td>
                <td>${myJson.skin_color}</td>
                <td>${myJson.hair_color}</td>
                <td>${myJson.eye_color}</td>
                <td>${myJson.birth_year}</td>
                <td>${myJson.gender}</td>`;
    document.getElementById('tableResidentsBody').appendChild(residentsTr);
}