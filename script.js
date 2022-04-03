const GEO_API = "http://api.openweathermap.org/geo/1.0/direct?appid=6c102539467abae7d838bbd06dece77b&q=";
const WEATHER_API = "https://api.openweathermap.org/data/2.5/weather?appid=6c102539467abae7d838bbd06dece77b&units=metric&";
const cloudIcon = document.querySelector(".cloud-img");
const degree = document.querySelector(".degree");
const weatherTitle = document.querySelector(".weather-title");
const cloudData = document.querySelector(".cloud-data");
const form = document.querySelector("form");
const theCity = document.querySelector(".city");
const weatherWrapper = document.querySelector(".weather-wrapper");

window.addEventListener("DOMContentLoaded", () => {
    showWeather("jakarta");
})

form.addEventListener("submit", (e)=> {
    e.preventDefault();
    const input = document.querySelector("input");
    console.log(input.value);
    showWeather(input.value);
})

async function showWeather(input) {
    const response = await fetch(GEO_API+input);
    const data = await response.json();
    const city = data[0];
    const { lat,lon } = city;

    const cityResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?appid=6c102539467abae7d838bbd06dece77b&units=metric&lat=${lat}&lon=${lon}`);
    const cityData = await cityResponse.json();
    const { weather, main, visibility, wind, name } = cityData;
    console.log(name);
    theCity.innerHTML = name;
    cloudIcon.innerHTML = `<i class="owi owi-${weather[0].icon}"></i>`;
    weatherTitle.innerHTML = weather[0].description;
    degree.innerHTML = Math.round(main.temp)+"°";
    cloudData.innerHTML = `<div class="humidity flex-data"><span>${main.humidity}</span><span>Humidity</span></div>
    <div class="visibility flex-data"><span>${visibility}</span><span>Visibility</span></div>
    <div class="index flex-data"><span>${wind.speed}</span><span>Speed</span></div>`

    if (main.temp < 20) {
       weatherWrapper.classList.add("cold");
    } else {
        weatherWrapper.classList.remove("cold");
    }


}