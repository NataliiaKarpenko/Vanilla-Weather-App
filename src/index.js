let now = new Date();

function formatDayDate(currentDate) {
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let day = days[currentDate.getDay()];
  let date = currentDate.getDate();

  return `${day}, ${date}`;
}

let dayDateElement = document.querySelector("#current-day-date");
dayDateElement.innerHTML = formatDayDate(now);

function formatMonth(now) {
  let months = [
    "Jan",
    "Feb",
    "March",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let month = months[now.getMonth()];

  return `${month}`;
}

let currentMonth = new Date();
document.querySelector("#month").innerHTML = formatMonth(currentMonth);

function formatYear(now) {
  let year = now.getFullYear();
  return `${year}`;
}

let currentYear = new Date();
document.querySelector("#year").innerHTML = formatYear(currentYear);

function formatTime(currentDay) {
  let hours = currentDay.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = currentDay.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `Last updated at ${hours}:${minutes}`;
}

let timeElement = document.querySelector("#current-time");
timeElement.innerHTML = formatTime(now);

function formatDayToCome(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#five-day-forecast");
  let forecastHTML = `<div class="row five-day-forecast-container">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `
    <div class="col-4">${formatDayToCome(forecastDay.dt)}</div>
    <div class="col-3 icon-row"><img src="http://openweathermap.org/img/wn/${
      forecastDay.weather[0].icon
    }@2x.png" alt="" width="30"
    /></div>
    <div class="col-5 temperature-row"><span class="min-temp">${Math.round(
      forecastDay.temp.min
    )}</span>/ ${Math.round(forecastDay.temp.max)} C°</div>
    `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "8dcd9f739c97fb9e5152465931cf4ba4";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function displayWeather(response) {
  let currentTemp = document.querySelector("#current-temperature");
  celsiusTemp = Math.round(response.data.main.temp);
  currentTemp.innerHTML = celsiusTemp;

  let currentHumidity = document.querySelector("#humidity");
  currentHumidity.innerHTML = response.data.main.humidity;

  let currentWind = document.querySelector("#wind");
  currentWind.innerHTML = response.data.wind.speed;

  let currentWeatherConditions = document.querySelector("#weather-conditions");
  currentWeatherConditions.innerHTML = response.data.weather[0].main;

  let icon = document.querySelector("#icon");
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  icon.setAttribute(
    "alt",
    `http://openweathermap.org/img/wn/${response.data.weather[0].description}@2x.png`
  );

  let city = document.querySelector("#city");
  city.innerHTML = response.data.name;
  fahrenheitUnit.classList.remove("active-link");
  celsiusUnit.classList.add("active-link");

  getForecast(response.data.coord);
}

function search(city) {
  let apiKey = "8dcd9f739c97fb9e5152465931cf4ba4";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");

  search(cityInput.value);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

function searchCurrentPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "8dcd9f739c97fb9e5152465931cf4ba4";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

function showCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchCurrentPosition);
}

let geolocationBtn = document.querySelector("#geolocation-btn");
geolocationBtn.addEventListener("click", showCurrentPosition);

function changeBackgroundImage() {
  let month = document.querySelector("#month").innerHTML;
  switch (month) {
    case "Dec":
    case "Jan":
    case "Feb":
      document.getElementById("container").style.backgroundImage =
        "url('src/images/Winter.png')";
      break;
    case "March":
    case "April":
    case "May":
      document.getElementById("container").style.backgroundImage =
        "url('src/images/Spring.png')";
      break;
    case "June":
    case "July":
    case "Aug":
      document.getElementById("container").style.backgroundImage =
        "url('src/images/Summer.png')";
      break;
    case "Sep":
    case "Oct":
    case "Nov":
      document.getElementById("container").style.backgroundImage =
        "url('src/images/Autumn.png')";
      break;
    default:
      document.getElementById("container").style.backgroundColor = "white";
      break;
  }
}

changeBackgroundImage();

let celsiusTemp = null;

function displayFahrenheitTemp(event) {
  event.preventDefault();
  let fahrenheitTemp = Math.round((celsiusTemp * 9) / 5) + 32;
  document.querySelector("#current-temperature").innerHTML = fahrenheitTemp;
  celsiusUnit.classList.remove("active-link");
  fahrenheitUnit.classList.add("active-link");
}

let fahrenheitUnit = document.querySelector("#fahrenheit-unit");
fahrenheitUnit.addEventListener("click", displayFahrenheitTemp);

function displayCelsiusTemp(event) {
  event.preventDefault();
  document.querySelector("#current-temperature").innerHTML = celsiusTemp;
  fahrenheitUnit.classList.remove("active-link");
  celsiusUnit.classList.add("active-link");
}

let celsiusUnit = document.querySelector("#celsius-unit");
celsiusUnit.addEventListener("click", displayCelsiusTemp);

search("Kyiv");
