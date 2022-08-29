function formatDay(now) {
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let day = days[now.getDay()];
  return `${day}`;
}
let currentDay = new Date();
document.querySelector("#day").innerHTML = formatDay(currentDay);

function formatDate(now) {
  let date = now.getDate();
  return `${date}`;
}
let currentDate = new Date();
document.querySelector("#date").innerHTML = formatDate(currentDate);

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

function formatTime(now) {
  let hour = now.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `Last updated at ${hour}:${minutes}`;
}
let currentTime = new Date();
document.querySelector("#time").innerHTML = formatTime(currentTime);

// function formatDay(timestamp) {
//   let date = new Date(timestamp * 1000);
//   let day = date.getDay();
//   let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

//   return days[day];
// }

function displayForecast() {
  let forecastElement = document.querySelector("#five-day-forecast");
  let forecastHTML = `<div class="row five-day-forecast-container">`;
  let days = ["Sun", "Mon", "Tue", "Fri", "Sat"];
  days.forEach(function (day) {
    

    forecastHTML = forecastHTML +
      `
    <div class="col-4">${day}</div>
    <div class="col-3 icon-row">s</div>
    <div class="col-5 forecast-row">30/ 35 C°</div>
    `;
  })
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

  // <div class="row week-weather-container">
  //   <div class="col-4">Saturday</div>
  //   <div class="col-3">⛅️</div>
  //   <div class="col-5">30/ 20 C°</div>
  // </div>
  // <div class="row week-weather-container">
  //   <div class="col-4">Saturday</div>
  //   <div class="col-3">⛅️</div>
  //   <div class="col-5">30/ 20 C°</div>
  // </div>
  // <div class="row week-weather-container">
  //   <div class="col-4">Saturday</div>
  //   <div class="col-3">⛅️</div>
  //   <div class="col-5">30/ 20 C°</div>
  // </div>
  // <div class="row week-weather-container">
  //   <div class="col-4">Saturday</div>
  //   <div class="col-3">⛅️</div>
  //   <div class="col-5">30/ 20 C°</div>
  // </div>
// }

// function getForecast(coordinates) {
//   console.log(coordinates)
//   let apiKey = "8dcd9f739c97fb9e5152465931cf4ba4";
//   let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
//   console.log(apiUrl)
//   axios.get(apiUrl).then(displayForecast);
// }

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
displayForecast();