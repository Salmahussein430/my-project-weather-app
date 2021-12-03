function showWeather(response) {
  document.querySelector("h1").innerHTML = response.data.name;
  document.querySelector("#highest-temp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#lowest-temp").innerHTML = Math.round(
    response.data.main.temp_min
  );
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#humidity").innerHTML = Math.round(
    response.data.main.humidity
  );
  document.querySelector("#weather-description").innerHTML =
    response.data.weather[0].description;

  console.log(response);
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

let h3 = document.querySelector("h3");

let now = new Date();
let currentDate = now.getDate();
let hour = now.getHours();
let minutes = now.getMinutes();
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
let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
let month = months[now.getMonth()];

h3.innerHTML = `${day} ${currentDate} ${month}, ${hour}: ${minutes}`;

function getCelsiusTemperature(event) {
  event.preventDefault();
  temperature.innerHTML = response.data.main.temp;
}

function getFahrenheitTemperature() {
  temperature.innerHTML = "63°";
}
let temperature = document.querySelector("#highest-temp");
let celsiusTemperature = document.querySelector("#celsius-link");
let fahrenheitTemperature = document.querySelector("#fahrenheit-link");

celsiusTemperature.addEventListener("click", getCelsiusTemperature);
fahrenheitTemperature.addEventListener("click", getFahrenheitTemperature);

let currentLocationButton = document.querySelector("#current-location");
currentLocationButton.addEventListener("click", displayCurrentLocation);
search("London");
