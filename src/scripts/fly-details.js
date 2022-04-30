import { airplains } from './data.js'

const planes = new Map(airplains.map(name => [
    name, require('../assets/planes/' + name + '.svg'),
]));


export const prepareForm = function(connection) {
    document.getElementById('ticket-search').style.display = 'none';
    const mainElement = document.getElementsByTagName('main')[0];
    mainElement.innerHTML = '';
    const planePlain = document.createElement('object');
    planePlain.setAttribute('type', 'image/svg+xml');
    planePlain.setAttribute('data', planes.get(connection.airplain));
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
    mainElement.appendChild(planePlain);

    document.querySelectorAll('svg #seat_letters *[class]').forEach(elem => {
        elem.setAttribute('class', 'st12')
    });
    document.querySelector('svg #colors').remove();

    document.querySelectorAll('svg #seats>g').forEach(elem => {
        Array.from(elem.getElementsByTagName('path')).forEach(pathElem => pathElem.style.fill = '#505050');
        let clicked = false;
        elem.style.zIndex = 19;
        elem.addEventListener('click', ()=>{
            console.log(clicked);
            if (!clicked) {
                Array.from(elem.getElementsByTagName('path')).forEach(pathElem => {
                    pathElem.style.fill = 'black';
                    pathElem.style.backgroundColor = '#505050';
                });
                clicked = true;
            } else {
                Array.from(elem.getElementsByTagName('path')).forEach(pathElem => {
                    pathElem.style.fill = '#505050';
                    pathElem.style.backgroundColor = '#ffffff';
                });
                clicked = false;
            }
        });
    });

}