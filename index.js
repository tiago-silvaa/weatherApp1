

/*-----------------------------------------------Temperatura ao inserir coordenadas----------------------------------------------------*/

document.getElementById("coordsForm").addEventListener("submit", submitCoords);

function submitCoords(event) {

    event.preventDefault();

    const latitude = parseFloat(document.getElementById("latitude").value);
    const longitude = parseFloat(document.getElementById("longitude").value);

    if (latitude < -90 || latitude > 90 || longitude < -180 || longitude > 180)
        alert("Error: The coordinates values are incorrect, try again.")
    else
    getWeatherData(latitude, longitude);    
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

            updateMap(latitude, longitude);
        });
}

/*-------------------------------------------------Temperatura ao inserir cidade---------------------------------------------------------*/

document.getElementById("cityForm").addEventListener("submit", submitCity);

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

/*--------------------------------------Temperatura da localização do utilizador/dispositivo------------------------------------------*/

function getLocationWeather() {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            fetchLocalWeather(latitude, longitude);
        });
    } else {
        document.getElementById("localWeatherTitle").innerHTML = "Error:";
        document.getElementById("localWeatherResult").innerHTML = "Geolocation is not supported by this browser.";
    }
}

function fetchLocalWeather(latitude, longitude) {
    const apiKey = "bd474823c8cd4e4d81b710cb3657e5b3";
    const apiCall = `https://api.weatherbit.io/v2.0/current?lat=${latitude}&lon=${longitude}&key=${apiKey}`;
    fetch(apiCall)
        .then(response => response.json())
        .then(data => {
            const weather = data.data[0];
            const temperature = weather.temp;
            const desc = weather.weather.description;
            const city = weather.city_name;
            const country = weather.country_code;

            document.getElementById("localWeatherTitle").innerHTML = "The Local Weather:";
            document.getElementById("localWeatherResult").innerHTML = `${temperature}°C, ${city}, ${country}, ${desc}.`;
        });
}

/*--------------------------------------------------------------Google Maps--------------------------------------------------*/

function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 0, lng: 0 },
        zoom: 2,
    });

    google.maps.event.addListener(map, 'click', function(clickEvent) {

        const latitude = clickEvent.latLng.lat();
        const longitude = clickEvent.latLng.lng(); //Guardar as coordenadas marcadas em variáveis
    
        getWeatherData(latitude, longitude);  // Passar as coordenadas e exibir a temperatura
    });
}

let marker; 

function updateMap(latitude, longitude) {
    const location = { lat: (latitude), lng: (longitude) };
    map.setCenter(location);
    map.setZoom(10);

    if (marker) {
        marker.setMap(null);   // Remover o marcador anterior
    }

    marker = new google.maps.Marker({
        position: location,
        map: map,
    });     
}

window.onload = initMap;  

//Aparecer o mapa imediatamente ao carregar a página 

/* Ou aparecer ao clicar no botão
document.getElementById("coordsForm").addEventListener("submit", initMap); */