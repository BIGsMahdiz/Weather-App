const BASE_URL = "https://api.openweathermap.org/data/2.5";
const API_KEY = "43773c1644b3fe0516aa0a622c97144d";

const saerchInput = document.querySelector("input");
const saerchButton = document.querySelector("button");
const weatherContainer = document.getElementById("weather");
const locationIcon = document.getElementById("location");

const getCurrentWeatherByName = async (city) => {
  const url = `${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`;
  const response = await fetch(url);
  const json = await response.json();
  return json;
};

const getCurrentWeatherByCoordinates = async (lat, lon) => {
  const url = `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
  const response = await fetch(url);
  const json = await response.json();
  return json;
};

const renderCurrentWeather = (data) => {
  const weatherJSX = `
    <h1>${data.name}, ${data.sys.country}</h1>
    <div id="main">
        <img alt="weather icon" src="https://openweathermap.org/img/w/${
          data.weather[0].icon
        }.png" />
        <span>Status: ${data.weather[0].main}</span>
        <p>Temp: ${Math.trunc(data.main.temp)} °C</p>
    </div>
    <div id="info">
        <p>Humidity: <span>${data.main.humidity} %</span></p>
        <p>Wind Speed: <span>${data.wind.speed} m/s</span></p>
    </div>
  `;
  weatherContainer.innerHTML = weatherJSX;
};

const saerchHandler = async () => {
  const cityName = saerchInput.value;

  if (!cityName) {
    alert("Please enter city name!");
    return;
  }

  const currentData = await getCurrentWeatherByName(cityName);
  renderCurrentWeather(currentData);
};

const successCallback = async (position) => {
  const { latitude, longitude } = position.coords;
  const currentData = await getCurrentWeatherByCoordinates(latitude, longitude);
  renderCurrentWeather(currentData);
};

const errorCallback = (error) => {
  console.log(error);
};

const locationHandler = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
  } else {
    alert("your browser does not support geolocation!");
  }
};

saerchButton.addEventListener("click", saerchHandler);
locationIcon.addEventListener("click", locationHandler);
