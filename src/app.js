// function formatDate(timestamp) {
//   let date = new Date(timestamp);
//   let hours = date.getHours();
//   if (hours < 10) {
//     hours = `0${hours}`;
//   }
//   let minutes = date.getMinutes();
//   if (minutes < 10) {
//     minutes = `0${minutes}`;
//   }

//   let days = [
//     "Sunday",
//     "Monday",
//     "Tuesday",
//     "Wednesday",
//     "Thursday",
//     "Friday",
//     "Saturday",
//   ];
//   let day = days[date.getDay()];
//   return `${day} ${hours}:${minutes}`;
// }

// function formatDay(timestamp) {
//   let date = new Date(timestamp * 1000);
//   let day = date.getDay();
//   let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

//   return days[day];
// }

// function displayForecast(response) {
//   let forecast = response.data.daily;

//   let forecastElement = document.querySelector("#forecast");

//   let forecastHTML = `<div class="row">`;
//   forecast.forEach(function (forecastDay, index) {
//     if (index < 6) {
//       forecastHTML =
//         forecastHTML +
//         `
//       <div class="col-2">
//         <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
//         <img
//           src="http://openweathermap.org/img/wn/${
//             forecastDay.weather[0].icon
//           }@2x.png"
//           alt=""
//           width="42"
//         />
//         <div class="weather-forecast-temperatures">
//           <span class="weather-forecast-temperature-max"> ${Math.round(
//             forecastDay.temp.max
//           )}° </span>
//           <span class="weather-forecast-temperature-min"> ${Math.round(
//             forecastDay.temp.min
//           )}° </span>
//         </div>
//       </div>
//   `;
//     }
//   });

//   forecastHTML = forecastHTML + `</div>`;
//   forecastElement.innerHTML = forecastHTML;
// }

// function getForecast(coordinates) {
//   let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
//   let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
//   axios.get(apiUrl).then(displayForecast);
// }

// let form = document.querySelector("#search-form");
// form.addEventListener("submit", handleSubmit);

// function searchCity(city) {
//   let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
//   let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
//   axios.get(apiUrl).then(displayTemperature);
// }

//  function handleSubmit(event) {
//    event.preventDefault();
//    let cityInputElement = document.querySelector("#city-input");
//    search(cityInputElement.value);
//  }

// ********************************************
// ********************************************
// ********************************************

function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
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
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
      <div class="col-2">
        <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
        <img
          src="http://openweathermap.org/img/wn/${
            forecastDay.weather[0].icon
          }@2x.png"
          alt=""
          width="42"
        />
        <div class="weather-forecast-temperatures">
          <span class="weather-forecast-temperature-max"> ${Math.round(
            forecastDay.temp.max
          )}° </span>
          <span class="weather-forecast-temperature-min"> ${Math.round(
            forecastDay.temp.min
          )}° </span>
        </div>
      </div>
  `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "d122489789ce9e01ba81bb0f4a64028b";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function displayWeather(response) {
  let cityElement = document.querySelector("#city");
  let dateElement = document.querySelector("#date");
  let descriptionElement = document.querySelector("#description");
 let temperatureElement = document.querySelector("#temperature");
  let iconElement = document.querySelector("#icon");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");

  celsiusTemperature = response.data.main.temp;

  cityElement.innerHTML = response.data.name;
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  descriptionElement.innerHTML = response.data.weather[0].description;
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);

  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
}


function displayFahrenheitTemperature(event) {
event.preventDefault();
let temperatureElement = document.querySelector("#temperature");
fahrenheitLink.classList.add("active");
celsiusLink.classList.remove("active");
let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);


function displayCelsiusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
 celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
   temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);


function searchCity(city) {
  let apiKey = "d122489789ce9e01ba81bb0f4a64028b";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input").value;
  searchCity(cityInputElement);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

searchCity("Belo Horizonte");

// function displayWeather(reply) {
//   document.querySelector("#city").innerHTML = reply.data.name;
//   document.querySelector("#temperature").innerHTML = Math.round(
//     reply.data.main.temp
//   );

//   document.querySelector("#humidity").innerHTML = reply.data.main.humidity;
//   document.querySelector("#wind").innerHTML = Math.round(reply.data.wind.speed);
//   document.querySelector("#description").innerHTML = reply.data.weather[0].main;
// }

// search("Perth");
