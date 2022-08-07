function formatDate(now) {
  let date = now.getDate();
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let month = months[now.getMonth()];
  let year = now.getFullYear();
  return `${date} ${month}, ${year}`;
}

let currentDate = new Date();
document.querySelector("#date").innerHTML = formatDate(currentDate);

function formatTime(now) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wedanesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let day = days[now.getDay()];
  let hour = now.getHours();
  let minutes = now.getMinutes();
  return `${day}, ${hour}:${minutes}`
}
  
let currentTime = new Date();
document.querySelector("#time").innerHTML = formatTime(currentTime);
