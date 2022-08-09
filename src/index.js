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

function displayTemperature(response) {
  let currentTemp = document.querySelector("#current-temperature");
  currentTemp.innerHTML = Math.round(response.data.main.temp);
  let currentHumidity = document.querySelector("#humidity");

  currentHumidity.innerHTML = response.data.main.humidity;
  let currentWind = document.querySelector("#wind");

  currentWind.innerHTML = response.data.wind.speed;
  let currentWeatherConditions = document.querySelector("#weather-conditions");
  currentWeatherConditions.innerHTML = response.data.weather[0].main;
}

let apiKey = "8dcd9f739c97fb9e5152465931cf4ba4";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=London&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(displayTemperature);

function changeBackgroundImage() {
  let month = document.querySelector("#month");
  if (month.innerHTML === "Aug") {
    document.getElementById("container").style.backgroundImage =
      "url('src/images/Summer.png')";
  } else if (month.innerHTML === "Sep") {
    document.getElementById("container").style.backgroundImage =
      "url('src/images/Autumn.png')";
  } else if (month.innerHTML === "Dec") {
    document.getElementById("container").style.backgroundImage =
      "url('src/images/Winter.png')";
  } else {
    document.getElementById("container").style.backgroundImage =
      "url('src/images/Spring.png')";
  }
}
changeBackgroundImage();
