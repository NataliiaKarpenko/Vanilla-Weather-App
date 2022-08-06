function formatDate(now) {
let date = now.getDate();
let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
let month = months[now.getMonth()];
let year = now.getFullYear();
return `${date} ${month}, ${year}`;
}
let currentTime = new Date();
document.querySelector("#date").innerHTML = formatDate(currentTime);
