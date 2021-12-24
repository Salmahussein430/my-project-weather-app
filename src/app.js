function showWeather(response) {
  document.querySelector("h1").innerHTML = response.data.name;
  celsiusTemperature = response.data.main.temp;
  document.querySelector("#highest-temp").innerHTML =
    Math.round(celsiusTemperature);

  document.querySelector("#wind-id").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#humidity-id").innerHTML = Math.round(
    response.data.main.humidity
  );
  document.querySelector("#weather-description").innerHTML =
    response.data.weather[0].description;

  document
    .querySelector("#icon")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
}

function search(city) {
  let apiKey = "49fcd8b8be4b347d531351f264a4f0d0";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-text-input").value;
  search(city);
}
let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

function searchLocation(position) {
  let apiKey = "49fcd8b8be4b347d531351f264a4f0d0";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showWeather);
}

function displayCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let now = new Date();
let currentDate = now.getDate();
let hour = now.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];

document.querySelector("#date-time").innerHTML = `${day}, ${hour}:${minutes}`;

function showForecast() {
  let forecastHTML = `<div class="row">`;
  let days = ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu"];

  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      ` 
              <div class="col-2">
                <div class="weather-forecast-preview">
                  <div class="weather-day">${day}</div>
                  <div class="weather-icons">
                    <img
                      src="http://openweathermap.org/img/wn/04d@2x.png"
                      alt="clouds"
                      class="weather-icon-1"
                      id="icon-1"
                      width="52"
                      height="52"
                    />
                  </div>
                  <div class="forecast-temperature">
                    <span class="max-temp">5°</span>
                    <span class="min-temp">1°</span>
                  </div>
                </div>
              </div>
            `;
  });

  forecastHTML = forecastHTML + `</div>`;

  document.querySelector("#weather-forecast").innerHTML = forecastHTML;
}

function showFahrenheitTemperature(event) {
  event.preventDefault();
  fahrenheitLink = Math.round((celsiusTemperature * 9) / 5 + 32);
  document.querySelector("#highest-temp").innerHTML = fahrenheitLink;
}

function showCelsiusTemperature(event) {
  event.preventDefault();
  document.querySelector("#highest-temp").innerHTML =
    Math.round(celsiusTemperature);
}

let currentLocationButton = document.querySelector("#current-location");
currentLocationButton.addEventListener("click", displayCurrentLocation);

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", showFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", showCelsiusTemperature);

let celsiusTemperature = null;

search("London");
showForecast();
