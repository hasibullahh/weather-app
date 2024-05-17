const cityInput = document.getElementById('city-input');
const weatherForm = document.getElementById('weather-form');
const cityEl = document.getElementById('city');
const temperatureEl = document.getElementById('temperature');
const descriptionEl = document.getElementById('description');
const weatherIconEl = document.getElementById('weather-icon'); // Assuming you have an element for the icon
const feelsLikeEl = document.getElementById('feels-like');
const humidityEl = document.getElementById('humidity');
const errorMessageEl = document.getElementById('error-message');

const API_KEY = '820ae713ead64c6c6f6f47cb14ee3be7'; // Replace with your actual key

function getWeather(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
  fetch(url)
    .then(response => response.json())
    .then(data => {
      if (data.cod === '404') {
        showError('City not found.');
      } else if (data.main) { // Check if 'main' property exists
        console.log(data.main);
        console.log(data);
        cityEl.textContent = data.name;
        temperatureEl.textContent = `Temperature: ${Math.round(data.main.temp)}°C`;
        descriptionEl.textContent = `Description: ${data.weather[0].description}`;
        weatherIconEl.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`; // Assuming you have an image element for the icon
        feelsLikeEl.textContent = `Feels like: ${Math.round(data.main.feels_like)}°C`;
        humidityEl.textContent = `Humidity: ${data.main.humidity}%`;
        showWeatherInfo();
      } else {
        showError('Error retrieving weather data.');
      }
    })
    .catch(error => console.error(error));
}

function showWeatherInfo() {
  document.getElementById('weather-info').classList.remove('hidden');
  errorMessageEl.classList.add('hidden');
}

function showError(message) {
  errorMessageEl.textContent = message;
  errorMessageEl.classList.remove('hidden');
  document.getElementById('weather-info').classList.add('hidden');
}

weatherForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const city = cityInput.value.trim();
  if (city) {
    getWeather(city);
    cityInput.value = '';
  }
});
