import { airplains } from './data.js'

const planes = new Map(airplains.map(name => [
    name, require('../assets/planes/' + name + '.svg'),
]));



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

const seatsSelected = function (maxPassangers) {
    const counterDiv = document.createElement('div');
    counterDiv.setAttribute('class', 'aside-content');
    counterDiv.style.display = 'block';
    counterDiv.innerText = 'Zaznaczone miejsca:'
    const selectedCounter = document.createElement('span');
    selectedCounter.innerText = '0';
    const maxPassangersSpan = document.createElement('span');
    maxPassangersSpan.innerText = '/' + maxPassangers;
    counterDiv.appendChild(document.createElement('br'));
    counterDiv.appendChild(selectedCounter);
    counterDiv.appendChild(maxPassangersSpan);
    return {counterDiv, selectedCounter};
};

export const prepareForm = function (connection) {
    let marked = [];
    let counterDiv, selectedCounter;
    ({counterDiv, selectedCounter} = seatsSelected(connection.passengers));
    const clickHandler = function(event) {
        if (marked.indexOf(event.target) === -1) {
            if (marked.length >= connection.passengers) return;
            marked.push(event.target);
            event.target.setAttribute('backup-color-data', event.target.style.fill)
            event.target.style.fill = 'rgb(0,0,0)';

        } else {
            event.target.style.fill = event.target.getAttribute('backup-color-data');
            const pos = marked.indexOf(event.target);
            marked = marked.slice(0, pos).concat(marked.slice(pos+1));
        }
        selectedCounter.innerText = marked.length
    }
    document.getElementById('ticket-search').style.display = 'none';
    const mainElement = document.getElementsByTagName('main')[0];
    mainElement.innerHTML = '';
    mainElement.style.display = 'flex';
    mainElement.style.flexDirection = 'column';
    const planePlain = document.createElement('div');
    planePlain.setAttribute('id', 'airplane-image');
    document.getElementsByTagName('aside')[0].appendChild(prepareLuggageMenu());
    document.getElementsByTagName('aside')[0].appendChild(counterDiv);
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
                Array.from(row.children).forEach((seat, index) => {
                    seat.setAttribute(
                        'data-seat-id',
                        rowNumber + (10 + index).toString(36).toLocaleUpperCase()
                    );
                    seat.addEventListener('click', clickHandler);
                    seat.addEventListener('mouseenter', () => {
                        hoveredSeat.style.display = 'block';
                        hoveredSeat.innerText = seat.getAttribute('data-seat-id');
                    });
                    seat.addEventListener('mouseleave', () => {
                        hoveredSeat.style.display = 'none';
                        hoveredSeat.innerText = '';
                    });
                })
            });
        });
}