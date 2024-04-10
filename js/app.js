import getWeatherData from "../utils/httpReq.js";
import { showModal } from "../utils/modal.js";
import getWeekDay from "../utils/customeDate.js";

const saerchInput = document.querySelector("input");
const saerchButton = document.querySelector("button");
const weatherContainer = document.getElementById("weather");
const forecastContainer = document.getElementById("forecast");
const locationIcon = document.getElementById("location");
const loader = document.getElementById("loader");

const renderCurrentWeather = (data) => {
  if (!data) return;
  loader.style.display = "block";

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

const renderForecastWeather = (data) => {
  if (!data) return;
  loader.style.display = "block";

  forecastContainer.innerHTML = "";
  data = data.list.filter((obj) => obj.dt_txt.endsWith("12:00:00"));
  data.forEach((i) => {
    const forecastJSX = `
      <div>
        <img alt="weather icon" src="https://openweathermap.org/img/w/${
          i.weather[0].icon
        }.png" />
        <h3>${getWeekDay(i.dt)}</h3>
        <p>Temp: ${Math.trunc(i.main.temp)} °C</p>
        <span>Status: ${i.weather[0].main}</span>
      </div>
    `;
    forecastContainer.innerHTML += forecastJSX;
  });
};

const saerchHandler = async () => {
  loader.style.display = "block";
  const cityName = saerchInput.value;

  if (!cityName) {
    showModal("Please enter city name!");
    return;
  }

  const currentData = await getWeatherData("current", cityName);
  renderCurrentWeather(currentData);
  const forecastData = await getWeatherData("forecast", cityName);
  renderForecastWeather(forecastData);
};

const successCallback = async (position) => {
  const currentData = await getWeatherData("current", position.coords);
  const forecastData = await getWeatherData("forecast", position.coords);
  renderCurrentWeather(currentData);
  renderForecastWeather(forecastData);
};

const errorCallback = (error) => {
  showModal(error.message);
};

const locationHandler = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
  } else {
    showModal("your browser does not support geolocation!");
  }
};

saerchButton.addEventListener("click", saerchHandler);
locationIcon.addEventListener("click", locationHandler);