import { airplains } from './data.js'

const planes = new Map(airplains.map(name => [
    name, require('../assets/planes/' + name + '.svg'),
]));
export const prepareForm = function (connection) {
    document.getElementById('ticket-search').style.display = 'none';
    const mainElement = document.getElementsByTagName('main')[0];
    mainElement.innerHTML = '';
    mainElement.style.display = 'flex';
    mainElement.style.flexDirection = 'column';
    const planePlain = document.createElement('div');
    planePlain.setAttribute('id', 'airplane-image');
    const luggageDiv = document.createElement('div');
    const luggageSelect = document.createElement('select');
    luggageSelect.setAttribute('id', 'luggage-select');
    const luggageTypes = ['Tylko podręczny', 'Mały', 'Duży', 'Bomba'];
    luggageTypes.forEach((type, index) => {
        const typeOption = document.createElement('option');
        typeOption.innerText = type;
        typeOption.value = index;
        luggageSelect.appendChild(typeOption);
    });
    const luggageSelectLabel = document.createElement('label');
    luggageSelectLabel.setAttribute('for', 'luggage-select');
    luggageSelectLabel.innerText = 'Wybierz swój bagaż:';
    luggageDiv.appendChild(luggageSelectLabel);
    luggageDiv.appendChild(luggageSelect);
    document.getElementsByTagName('aside')[0].appendChild(luggageDiv);
    mainElement.appendChild(planePlain);
    fetch(planes.get(connection.airplain), { method: 'GET' })
        .then(res => res.text())
        .then(data => {
            const workspace = document.createElement('div');
            workspace.innerHTML = data;
            const svgElement = workspace.getElementsByTagName('svg')[0];
            planePlain.appendChild(svgElement);
            const seats = document.querySelectorAll('#seats>g');
            Array.from(seats).forEach(elem => elem.addEventListener('click', function() {
                this.style.outline = "solid 3px black";
            }));
        });
}