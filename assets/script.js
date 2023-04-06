var form = document.querySelector('#form');
var userInput = document.querySelector('#userInput');
var searchBtn = document.querySelector('#searchBtn');
var currentWeather = document.querySelector('#currentWeather');
var forecastInput = document.querySelector('#forecastInput');
var API = "b373269e338be8cd57472d6c930ea165";
var apiStart =
  "https://api.openweathermap.org/data/2.5/forecast?&units=imperial&lat=";
var apiCurrentStart =
  "https://api.openweathermap.org/data/2.5/weather?&units=imperial&lat=";
var lonKey = "&lon=";
var apiCoorStart = "https://api.openweathermap.org/geo/1.0/direct?q=";
var coorLimit = "&limit=";
var limit = "";
// Fetches weather data from OpenWeatherMap API
function fetchWeatherData(city) {
  const apiKey = "b373269e338be8cd57472d6c930ea165"; // Replace with your OpenWeatherMap API key
  const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${apiKey}`;

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      displayCurrentWeather(data);
      displayFiveDayForecast(data);
    })
    .catch(error => {
      console.error('Error fetching weather data:', error);
    });
}

// Displays current weather data
function displayCurrentWeather(data) {
  const cityElement = document.getElementById('city');
  const dateElement = document.getElementById('date');
  const currentTempElement = document.getElementById('current-temp');
  const currentWindElement = document.getElementById('current-wind');
  const currentHumidityElement = document.getElementById('current-humidity');

  cityElement.textContent = data.city.name;
  dateElement.textContent = dayjs().format('MMM D, YYYY');
  currentTempElement.textContent = `Temperature: ${data.list[0].main.temp}°C`;
  currentWindElement.textContent = `Wind: ${data.list[0].wind.speed} m/s`;
  currentHumidityElement.textContent = `Humidity: ${data.list[0].main.humidity}%`;
}

// Displays five-day forecast data
function displayFiveDayForecast(data) {
  const forecastContainer = document.getElementById('forecast-container');
  forecastContainer.innerHTML = '';

  for (let i = 1; i <= 5; i++) {
    const forecastDate = dayjs(data.list[i * 8 - 1].dt_txt).format('MMM D');
    const forecastTemp = data.list[i * 8 - 1].main.temp;
    const forecastWind = data.list[i * 8 - 1].wind.speed;
    const forecastHumidity = data.list[i * 8 - 1].main.humidity;

    const forecastElement = document.createElement('div');
    forecastElement.className = 'sub-forecast';
    forecastElement.innerHTML = `
      <div class="dates">${forecastDate}</div>
      <div class="card-details">Temperature: ${forecastTemp}°C</div>
      <div class="card-details">Wind: ${forecastWind} m/s</div>
      <div class="card-details">Humidity: ${forecastHumidity}%</div>
    `;

    forecastContainer.appendChild(forecastElement);
  }
}

// Handles form submission
function handleSubmit(event) {
  event.preventDefault();
  const userInput = document.getElementById('userInput').value;
  fetchWeatherData(userInput);
}

// Event listener for form submission
document.getElementById('form').addEventListener('submit', handleSubmit);
