export const renderWeather = function(lon, lat) {

    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Host': 'weatherbit-v1-mashape.p.rapidapi.com',
            'X-RapidAPI-Key': '1ab7838891msh8577f4d17eab75dp1132d7jsnf43ad4180920'
        }
    };
    
    fetch(`https://weatherbit-v1-mashape.p.rapidapi.com/current?lon=${lon}&lat=${lat}&units=metric&lang=pl`, options)
        .then(response => response.json())
        .then(responseData => {
            const resp = responseData.data[0];
            const weatherElement = document.getElementById('weather');
            weatherElement.innerText = resp.weather.description + ' (' + resp.temp + '°C)'
        })
        .catch(err => console.error(err));
};