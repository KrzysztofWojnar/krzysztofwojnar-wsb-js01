import { airplains } from './data.js'

const planes = new Map(airplains.map(name => [
    name, require('../assets/planes/' + name + '.svg'),
]));


export const prepareForm = function(connection) {
    document.getElementById('ticket-search').style.display = 'none';
    const mainElement = document.getElementsByTagName('main')[0];
    mainElement.innerHTML = '';
    mainElement.style.display = 'flex';
    mainElement.style.flexDirection = 'column';
    const planePlain = document.createElement('object');
    planePlain.setAttribute('type', 'image/svg+xml');
    planePlain.setAttribute('data', planes.get(connection.airplain));
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
    mainElement.appendChild(luggageDiv);
    mainElement.appendChild(document.createComment('br'));
    mainElement.appendChild(planePlain);
}