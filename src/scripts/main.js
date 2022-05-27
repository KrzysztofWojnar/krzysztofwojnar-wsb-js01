import * as data from './data.js';
import { login } from './signing-up.js';
import { fetchCurrencyValue } from './currency-picker.js';
import { renderWeather } from './weather.js'
const departureAirportSelect = document.getElementById('departure-airport');
const arrivalAirportSelect = document.getElementById('arrival-airport');
const buyButton = document.getElementById('buy-button');
const modalBackgound = document.getElementById('modal-background');
const modalWindow = document.getElementById('modal-window');
let departureAirportObj;
export const getTimeZone = () => departureAirportObj.timeZone ;
export const modal = {
    open: function () {
        modalBackgound.style.display = 'block';
        modalWindow.innerHTML = '';
    },
    close: function () {
        modalBackgound.style.display = 'none';
    },
    modalWindow
}
let currentConnections = [];
new Set(data.connections.map(connection => connection.departure)).forEach(airport => {
    const airportOption = document.createElement('option');
    const name = data.availableAirports[airport].city;
    airportOption.innerText = name;
    airportOption.value = airport;
    departureAirportSelect.appendChild(airportOption);
});
const changeCurrency = function (value, newCurr) {
    buyButton.setAttribute('disabled', '');
    fetchCurrencyValue(value, newCurr, newValue => {
        document.getElementById('price').innerText = (+newValue).toFixed(2);
        buyButton.removeAttribute('disabled');
    });
}
function populateDetails() {
    const currencySelect = document.getElementById('currency');
    const arrivalAirportNr = arrivalAirportSelect.value;
    const connection = data.connections.find(conn => conn.arrival == arrivalAirportNr);
    document.getElementById('departure-time').innerText = connection.hour;
    document.getElementById('price').innerText = connection.price;
    Array.from(currencySelect.getElementsByTagName('option')).forEach(
        currOption => { if (!data.defaultCurrencies.includes(currOption.value)) currOption.remove(); }
    );
    const destinationsCurrNr = data.availableAirports[arrivalAirportNr].currency;
    const destinationsCurr = data.currencies[destinationsCurrNr];
    if (!data.defaultCurrencies.includes(destinationsCurr)) {
        const newCurr = document.createElement('option');
        newCurr.value = destinationsCurr;
        newCurr.innerText = destinationsCurr;
        currencySelect.appendChild(newCurr);
    }
    currencySelect.value = data.currencies[0];
    currencySelect.addEventListener(
        'change',
        function () {
            changeCurrency(
                connection.price,
                this.value
            );
        }
    )
    document.getElementById('flight-duration').innerText = connection.duration;
}
function populateArrivals() {
    arrivalAirportSelect.innerHTML = '';
    const departureAirportNr = departureAirportSelect.value;
    currentConnections = data.connections.filter(connection => connection.departure == departureAirportNr);
    currentConnections.forEach(connection => {
        const airport = connection.arrival;
        const airportOption = document.createElement('option');
        const name = data.availableAirports[airport].city;
        airportOption.innerText = name;
        airportOption.value = airport;
        airportOption.id = 'arrival-' + airport;
        arrivalAirportSelect.appendChild(airportOption);
        populateDetails();
    });
    departureAirportObj = data.availableAirports[departureAirportNr];
    renderWeather(departureAirportObj.lon, departureAirportObj.lat);
    const now = new Date()
        .toLocaleDateString('pl-PL', { timeZone: departureAirportObj.timeZone })
        .split('.')
        .map(part => +part);
    document.getElementById('date').value = now[2] +
        '-' + (now[1] + '').padStart(2, '0') +
        '-' + (now[0] + '').padStart(2, '0');
    document.getElementById('date').min = document.getElementById('date').value;
}
departureAirportSelect.addEventListener('change', populateArrivals);
populateArrivals();
arrivalAirportSelect.addEventListener('change', populateDetails);
const connectionToString = function () {
    return "Flight from\n" +
        this.departure + '\n' +
        'to\n' + this.arrival + '\n' +
        'on ' + this.date + '.\n' +
        'Starts at ' + this.hour + '\n' +
        'and will lasts ' + this.duration + '.';
}
buyButton.addEventListener('click', () => {
    const arrivalAirportNr = arrivalAirportSelect.value;
    const connection = currentConnections.filter(connection => connection.arrival == arrivalAirportNr)[0];
    const arrivalAirportDetails = data.availableAirports[connection.arrival];
    login({
        ...connection,
        date: document.getElementById('date').value,
        passengers: +document.getElementById('passengers').value,
        airplain: data.airplains[connection.airplain],
        departure: data.availableAirports[connection.departure],
        arrival: arrivalAirportDetails,
        targetCurrency: data.currencies[arrivalAirportDetails.currency],
        toString: connectionToString
    });
});
