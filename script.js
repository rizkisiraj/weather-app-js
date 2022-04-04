const GEO_API = "https://api.openweathermap.org/geo/1.0/direct?appid=6c102539467abae7d838bbd06dece77b&q=";
const WEATHER_API = "https://api.openweathermap.org/data/2.5/weather?appid=6c102539467abae7d838bbd06dece77b&units=metric&";
const cloudIcon = document.querySelector(".cloud-img");
const degree = document.querySelector(".degree");
const weatherTitle = document.querySelector(".weather-title");
const cloudData = document.querySelector(".cloud-data");
const form = document.querySelector("form");
const theCity = document.querySelector(".city");
const weatherWrapper = document.querySelector(".weather-wrapper");
const textWrapper = document.querySelector(".text-wrapper");

window.addEventListener("DOMContentLoaded", () => {
    const cityList = ["Kabul","Jakarta","Bandung","London","Doha","Mecca","Medina","Moscow","Barcelona","Madrid"];
    laoding();
    let index = Math.floor(Math.random() * cityList.length);
    console.log(cityList[index]);
    showWeather(cityList[index]);
})

form.addEventListener("submit", (e)=> {
    e.preventDefault();
    const input = document.querySelector("input");
    laoding();
    showWeather(input.value);
    input.value = "";
})

async function showWeather(input) {
    try {
        const response = await fetch(GEO_API+input);
        const data = await response.json();
        const city = data[0];
        const { lat,lon } = city;

        const cityResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?appid=6c102539467abae7d838bbd06dece77b&units=metric&lat=${lat}&lon=${lon}`);
        const cityData = await cityResponse.json();
        const { weather, main, visibility, wind, name } = cityData;
        console.log(name);

        if (name.toLowerCase() == input.toLowerCase()) {
            textWrapper.innerHTML = `<h2 class="city">${name}</h2>
            <span class="degree" style="display: block;">${Math.round(main.temp)+"°"}</span>`
        } else {
            textWrapper.innerHTML = `<h2 class="city">${input}</h2>
            <span class="degree" style="display: block;">${Math.round(main.temp)+"°"}</span>`
        }
        
        cloudIcon.innerHTML = `<i class="owi owi-${weather[0].icon}"></i>`;
        weatherTitle.innerHTML = weather[0].description;
        cloudData.innerHTML = `<div class="humidity flex-data"><span>${main.humidity}</span><span>Humidity</span></div>
        <div class="visibility flex-data"><span>${visibility}</span><span>Visibility</span></div>
        <div class="index flex-data"><span>${wind.speed}</span><span>Speed</span></div>`

        if (main.temp < 20) {
            weatherWrapper.classList.add("cold");
        } else {
            weatherWrapper.classList.remove("cold");
        }
    }
    catch(e) {
        alert("Please input valid city!")
    }
    
}

function laoding() {
    textWrapper.innerHTML = `<div class="loading"></div><div class="loading1" style="margin-top: 28px;"></div>`
    cloudIcon.innerHTML = `<i class="owi owi-50d"></i>`;
    cloudData.innerHTML = `<div class="humidity flex-data"><div class="loading"></div></div>
    <div class="visibility flex-data"><div class="loading"></div></div>
    <div class="index flex-data"><div class="loading"></div></div>`;
    weatherTitle.innerHTML = `<div class="loading"></div>`
}