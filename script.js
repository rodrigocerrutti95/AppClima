const urlBase = 'https://api.openweathermap.org/data/2.5/weather'; //Dejamos la url base. Sacamos la parte dinamica.
let API_KEY = '625128b59d3faceb6079368c56fb9df3';
const diffKelvin = 273.15;

document.getElementById('searchButton').addEventListener('click', () => {
    const city = document.getElementById('cityInput').value;
    if (city) {
        //Llamar API para que de informacion de clima.
        fetchWeather(city);
    }
    else {
        alert('Ingrese una ciudad valida.')
    }
})

function fetchWeather(city) {
    //Usaremos ahora la URL Base y el resto ?q={city name}&appid={API key} reemplazando por las variables.
    fetch(`${urlBase}?q=${city}&appid=${API_KEY}&lang=es`) // Fetch llama a la API. Para traducir agregamos: &lang=es
        .then(data => data.json())//Hacemos una promesa.
        .then(data => showWeatherData(data))

}

function showWeatherData(data) {
    const divResponseData = document.getElementById('responseData');
    divResponseData.innerHTML = '';
    // Nos fijamos en postman que valor de data hay que llamar. Si tenemos sys.country es porque cuntry esta dentro de sys.
    const cityName = data.name ;
    const countryName = data.sys.country;
    const temp = data.main.temp;
    const humidity = data.main.humidity ;
    const description = data.weather[0].description;
    const icon = data.weather[0].icon;
 // Ahora que ya tenemos llamados los datos, debemos generar la forma de mostrarlos. 
    const cityInfo = document.createElement('h2');
    cityInfo.textContent = `${cityName},${countryName}`;
    
    const tempInfo = document.createElement('p');
    tempInfo.textContent = `La temperatura es: ${Math.floor(temp-diffKelvin)} C`;
    
    const humidityInfo = document.createElement('p');
    humidityInfo.textContent = `La humedad es del: ${humidity}%`;

    const iconInfo = document.createElement('img');
    iconInfo.src = `https://openweathermap.org/img/wn/${icon}@2x.png`;

    const descriptionInfo = document.createElement('p');
    descriptionInfo.textContent = `La descripcion meteorologica es: ${description}`;


    divResponseData.appendChild(cityInfo);
    divResponseData.appendChild(tempInfo);
    divResponseData.appendChild(humidityInfo);
    divResponseData.appendChild(iconInfo);
    divResponseData.appendChild(descriptionInfo);
}