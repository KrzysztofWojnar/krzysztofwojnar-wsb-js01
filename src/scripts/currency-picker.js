export const fetchCurrencyValue = async function (originValue, destinationCurrency, callback) {
    if (destinationCurrency == 'EUR') {
        callback(originValue);
        return;
    }

    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Host': 'currency-converter5.p.rapidapi.com',
            'X-RapidAPI-Key': '1ab7838891msh8577f4d17eab75dp1132d7jsnf43ad4180920'
        }
    };
    
    fetch(`https://currency-converter5.p.rapidapi.com/currency/convert?format=json&from=EUR&to=${destinationCurrency}&amount=${originValue}`, options)
        .then(response => response.json())
        .then(data => {
            callback(data.rates[destinationCurrency].rate_for_amount);
        })
        .catch(err => {
            fetch(
                'https://api.getgeoapi.com/v2/currency/convert' +
                '?api_key=46a47804f006a9f74ef8da7362394c6d566dc16d' +
                '&from=EUR' +
                '&to=' + destinationCurrency +
                '&amount=' + originValue +
                '&format=json'
                ).then(resp => resp.json()).then(data => callback(data.rates[destinationCurrency].rate_for_amount));
            });
}