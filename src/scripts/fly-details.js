import { airplains } from './data.js'

const planes = new Map(airplains.map(name => [
    name, require('../assets/planes/' + name + '.svg'),
]));

const clickHandler = function(event) {
    event.target.style.fill = 'rgb(0,0,0)';

}

const prepareLuggageMenu = function() {
    const luggageDiv = document.createElement('div');
    luggageDiv.setAttribute('class', 'aside-content');
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
    return luggageDiv;
}
export const prepareForm = function (connection) {
    document.getElementById('ticket-search').style.display = 'none';
    const mainElement = document.getElementsByTagName('main')[0];
    mainElement.innerHTML = '';
    mainElement.style.display = 'flex';
    mainElement.style.flexDirection = 'column';
    const planePlain = document.createElement('div');
    planePlain.setAttribute('id', 'airplane-image');
    document.getElementsByTagName('aside')[0].appendChild(prepareLuggageMenu());
    const hoveredSeat = document.createElement('div');
    hoveredSeat.setAttribute('class', 'aside-content');
    hoveredSeat.setAttribute('id', 'hovered-seat');
    hoveredSeat.style.display = 'none';
    document.getElementsByTagName('aside')[0].appendChild(hoveredSeat);
    mainElement.appendChild(planePlain);
    fetch(planes.get(connection.airplain), { method: 'GET' })
        .then(res => res.text())
        .then(data => {
            const workspace = document.createElement('div');
            workspace.innerHTML = data;
            const svgElement = workspace.getElementsByTagName('svg')[0];
            planePlain.appendChild(svgElement);
            const rows = Array.from(document.querySelectorAll('#colors .seats-row'));
            rows.forEach(row => {
                const rowNumber = row.getAttribute('data-row');
                Array.from(row.getElementsByTagName('path')).forEach((seat, index) => {
                    seat.setAttribute(
                        'data-seat-id',
                        rowNumber + (10 + index).toString(36).toLocaleUpperCase()
                    );
                    seat.addEventListener('click', clickHandler);
                    seat.addEventListener('mouseenter', () => {
                        console.log()
                        hoveredSeat.style.display = 'block';
                        hoveredSeat.innerText = seat.getAttribute('data-seat-id');
                    });
                    seat.addEventListener('mouseleave', () => {
                        hoveredSeat.style.display = 'none';
                        hoveredSeat.innerText = '';
                    });
                })
            });


            // const seats = document.querySelectorAll('#seats>g');
            // Array.from(seats).forEach(elem => elem.addEventListener('click', function() {
            //     this.style.outline = "solid 3px black";
            // }));
        });
}