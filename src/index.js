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
  console.log(response.data);
  let currentTemp = document.querySelector("#current-temperature");
  currentTemp.innerHTML = Math.round(response.data.main.temp);

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
}

function changeBackgroundImage() {
  let month = document.querySelector("#month").innerHTML;
  switch (month) {
    case "Dec":
      document.getElementById("container").style.backgroundImage =
        "url('src/images/Winter.png')";
      break;
    case "Jan":
      document.getElementById("container").style.backgroundImage =
        "url('src/images/Winter.png')";
      break;
    case "Feb":
      document.getElementById("container").style.backgroundImage =
        "url('src/images/Winter.png')";
      break;
    case "March":
      document.getElementById("container").style.backgroundImage =
        "url('src/images/Spring.png')";
      break;
    case "April":
      document.getElementById("container").style.backgroundImage =
        "url('src/images/Spring.png')";
      break;
    case "May":
      document.getElementById("container").style.backgroundImage =
        "url('src/images/Spring.png')";
      break;
    case "June":
      document.getElementById("container").style.backgroundImage =
        "url('src/images/Summer.png')";
      break;
    case "July":
      document.getElementById("container").style.backgroundImage =
        "url('src/images/Summer.png')";
      break;
    case "Aug":
      document.getElementById("container").style.backgroundImage =
        "url('src/images/Summer.png')";
      break;
    case "Sep":
      document.getElementById("container").style.backgroundImage =
        "url('src/images/Autumn.png')";
      break;
    case "Oct":
      document.getElementById("container").style.backgroundImage =
        "url('src/images/Autumn.png')";
      break;
    case "Nov":
      document.getElementById("container").style.backgroundImage =
        "url('src/images/Autumn.png')";
      break;
  }
}
changeBackgroundImage();

function search(city) {
  let apiKey = "8dcd9f739c97fb9e5152465931cf4ba4";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  search(cityInput.value);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);
