import { getTimeZone } from './main.js';

const timeDiv = document.getElementById('actual-date');
const months = [
    'Styczeń',
    'Luty',
    'Marzec',
    'Kwiecień',
    'Maj',
    'Czerwiec',
    'Lipiec',
    'Sierpień',
    'Wrzesień',
    'Październik',
    'Listopad',
    'Grudzień'
];
const daysOfWeek = [
    'Niedziela',
    'Poniedziałek',
    'Wtorek',
    'Środa',
    'Czwartek',
    'Piątek',
    'Sobota'
];
setInterval(
    ()=>{
        const timeZone = getTimeZone();
        const nowLocalDate = new Date()
            .toLocaleDateString('en-US', {timeZone});
        const now = new Date()
            .toLocaleDateString('pl-PL', {timeZone})
            .split('.')
            .map(part => +part);
        timeDiv.innerText = (new Date()).toLocaleTimeString('pl-PL', {timeZone}).toString() + '\n'
            + now[0] + ' ' + months[now[1]-1] + ' '  + now[2] + '\n'
            + daysOfWeek[(new Date(nowLocalDate)).getDay()];
    },
    1000
);