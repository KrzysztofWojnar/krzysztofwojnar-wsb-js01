export const defaultCurrencies = [
    'EUR',
    'PLN',
    'USD'
];
export const currencies = [
    ...defaultCurrencies,
    'RUB'
];
export const airplains = [
    'Boeing_787-8',
    'Embraer_ERJ-170'
];
export const availableAirports = [
    { city: 'Wrocław', timeZone: 'Europe/Warsaw', currency: 0},
    { city: 'Los Angeles', timeZone: 'America/Los_Angeles', currency: 2 },
    { city: 'Irkutsk', timeZone: 'Asia/Irkutsk', currency: 3 },
    { city: 'Berlin', timeZone: 'Europe/Berlin', currency: 1 },
];
export const connections = [
    { departure: 0, arrival: 1, hour: '16:00', duration: '6:51', airplain: 0, price: 300},
    { departure: 0, arrival: 2, hour: '01:37', duration: '4:32', airplain: 0, price: 181},
    { departure: 0, arrival: 3, hour: '12:00', duration: '1:15', airplain: 1, price: 77},
    { departure: 1, arrival: 3, hour: '10:31', duration: '6:22', airplain: 0, price: 300}
];
