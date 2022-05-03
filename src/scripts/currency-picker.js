export const fetchCurrencyValue = async function (originValue, destinationCurrency, callback) {
    if (destinationCurrency == 'EUR') {
        callback(originValue);
        return;
    }
    fetch(
        'https://api.getgeoapi.com/v2/currency/convert' +
        '?api_key=46a47804f006a9f74ef8da7362394c6d566dc16d' +
        '&from=EUR' +
        '&to=' + destinationCurrency +
        '&amount=' + originValue +
        '&format=json'
    ).then(resp => resp.json()).then(data => callback(data.rates[destinationCurrency].rate_for_amount));
}