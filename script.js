const api = {
  key: "be830cdd67a8ba8d469a43def663c466",
  base: "https://api.openweathermap.org/data/2.5/"
};

const searchbox = document.querySelector(".search-box");
const searchButton = document.querySelector("button");

searchButton.addEventListener("click", () => {
  searchWeather();
});

searchbox.addEventListener("keypress", (event) => {
  if (event.keyCode === 13) {
    searchWeather();
  }
});

function searchWeather() {
  const query = searchbox.value;
  if (query.trim() !== "") {
    getResults(query);
    searchbox.value = "";
  }
}

function getResults(query) {
  fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then((weather) => {
      return weather.json();
    })
    .then(displayResults)
    .catch((error) => {
      console.log("Error fetching weather data:", error);
    });
}
  
  function displayResults(weather) {
    console.log(weather);
    let city = document.querySelector(".location .city");
    city.innerText = `${weather.name}, ${weather.sys.country}`;
  
    let now = new Date();
    let date = document.querySelector(".location .date");
    date.innerText = dateBuilder(now);
  
    let temp = document.querySelector(".weather .temperature");
    temp.innerHTML = `${Math.round(weather.main.temp)}<span>°C</span>`;
  

    let weatherIcon = document.createElement("i");
    weatherIcon.classList.add("fas");
    let weather_el = document.querySelector(".weather .atmosphere");
    weather_el.innerHTML = weather.weather[0].main + " ";

  switch (weather.weather[0].main.toLowerCase()) {
    case "clear":
      weatherIcon.classList.add("fa-sun");
      weather_el.style.color = "#FFD700";
      break;
    case "clouds":
      weatherIcon.classList.add("fa-cloud");
      weather_el.style.color = "#C0C0C0";
      break;
    case "rain":
      weatherIcon.classList.add("fa-cloud-showers-heavy");
      weather_el.style.color = "#4682B4";
      break;
    case "thunderstorm":
      weatherIcon.classList.add("fa-bolt");
      weather_el.style.color = "#4B0082";
      break;
    case "snow":
      weatherIcon.classList.add("fa-snowflake");
      weather_el.style.color = "#FFFFFF";
      break;
    case "mist":
      weatherIcon.classList.add("fa-smog");
      weather_el.style.color = "#E6E6FA";
      break;
    case "haze":
      weatherIcon.classList.add("fa-smog");
      weather_el.style.color = "#D3D3D3"; 
      break;
    default:
      weatherIcon.classList.add("fa-question");
      weather_el.style.color = "#333";
      break;
  }

    weather_el.appendChild(weatherIcon);

    let wind = document.querySelector(".weather .wind");
    wind.innerText = `Wind: ${weather.wind.speed} m/s`;

    let humidity = document.querySelector(".weather .humidity");
    humidity.innerText = `Humidity: ${weather.main.humidity}%`;
  
  }
  
  function dateBuilder(d) {
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
      "December"
    ];
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ];
  
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
  
    return `${day}, ${date} ${month} ${year}`;
  }