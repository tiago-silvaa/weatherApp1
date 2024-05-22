document.getElementById("coordsForm").addEventListener("submit", submitCoords);
document.getElementById("cityForm").addEventListener("submit", submitCity);

function submitCoords(event) {
    event.preventDefault();

    const latitude = document.getElementById("latitude").value;
    const longitude = document.getElementById("longitude").value;

    getWeatherData(latitude, longitude);

    if (latitude < -90 || latitude > 90 || longitude < -180 || longitude > 180)
        alert("Error: The coordinates values are incorrect, try again.")
    
}

function getWeatherData(latitude, longitude) {
    const apiKey = "bd474823c8cd4e4d81b710cb3657e5b3";
    const apiCall = `https://api.weatherbit.io/v2.0/current?lat=${latitude}&lon=${longitude}&key=${apiKey}`;
    fetch(apiCall)
        .then (response => response.json())
        .then (data => {
            const weather = data.data[0];
            const temperature = weather.temp;
            const country = weather.country_code;
            const city = weather.city_name;
            const desc = weather.weather.description;

            document.getElementById("weatherTitleCoords").innerHTML = "The Weather in the Coordinates:";
            document.getElementById("weatherResultCoords").innerHTML = `${temperature}°C, ${city}, ${country}, ${desc}.`;
        });
}

function submitCity(event) {
    event.preventDefault();

    const cityInput = document.getElementById("cityInput").value;

    getCityWeather(cityInput);
}

function getCityWeather (cityName) {
    const apiKey = "bd474823c8cd4e4d81b710cb3657e5b3";
    const apiCall = `https://api.weatherbit.io/v2.0/current?city=${cityName}&key=${apiKey}`;
    fetch (apiCall)
        .then(response => response.json())
        .then(data => {
            const weather = data.data[0];
            const temperature = weather.temp;
            const desc = weather.weather.description;
            const city = weather.city_name;

            document.getElementById("weatherTitleCity").innerHTML = `The Weather in ${city}:`;
            document.getElementById("weatherResultCity").innerHTML = `${temperature}°C, ${desc}.`;
        });
}

