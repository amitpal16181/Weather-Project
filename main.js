const api = {
        key: "5af31780c6a157f2580834cf5b6820b6",
        base: "https://api.openweathermap.org/data/2.5/"
}

function firstCall() {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=new+delhi&units=metric&APPID=5af31780c6a157f2580834cf5b6820b6`)
                .then(weather => {
                        return weather.json();
                }).then(displayResults);
}

const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress', setQuery);

function setQuery(e) {
        firstCall();
        if (e.keyCode == 13) {
                getResults(searchbox.value);
        }
}

function getResults(Query) {
        fetch(`${api.base}weather?q=${Query}&units=metric&APPID=${api.key}`)
                .then(weather => {
                        return weather.json();
                }).then(displayResults);
}

function displayResults(weather) {

        let city = document.querySelector('.location .city');
        city.innerText = `${weather.name}, ${weather.sys.country}`;
        let now = new Date();
        let date = document.querySelector('.location .date');
        date.innerText = dateMaker(now);

        let tempC = document.querySelector('.temp-val .degC');
        let tempF = document.querySelector('.temp-val .degF');
        tempC.innerHTML = `<h3>${Math.round(weather.main.temp)} &deg;C</h3>`;
        let tf = convertToF(weather.main.temp);
        tempF.innerHTML = `<h3>${Math.round(tf)} &deg;F</h3>`
        let weth = document.querySelector('.temp-val .weth');
        weth.innerHTML = `<h5>${weather.weather[0].main}</h5>`;

        let min = document.querySelector('.min');
        min.innerHTML = `${weather.main.temp_min} / ${convertToF(weather.main.temp_min)}`;
        let max = document.querySelector('.max');
        max.innerHTML = `${weather.main.temp_max} / ${convertToF(weather.main.temp_max)}`;

        let sr = document.querySelector('.sunrise');
        let ss = document.querySelector('.sunset');

        sr.innerHTML = `${timeMaker(weather.sys.sunrise, weather.timezone)}`;
        ss.innerHTML = `${timeMaker(weather.sys.sunset, weather.timezone)}`;

        let prss = document.querySelector('.pres');
        let hmd = document.querySelector('.humid');

        prss.innerHTML = `${weather.main.pressure / 1000} atm`;
        hmd.innerHTML = `${weather.main.humidity} %`

        let ws = document.querySelector('.ws');
        let wd = document.querySelector('.wd');

        ws.innerHTML = `${weather.wind.speed} m/s`;
        wd.innerHTML = `${weather.wind.deg} deg`;
}

function timeMaker(t) {
        let date = new Date(t * 1000);
        let data = date.toGMTString();
        let hr = data[17] + data[18];
        let mn = data[20] + data[21];
        let time = `${hr}:${mn} GMT`;
        return time;

}

function convertToF(c) {
        let f = (c * 9 / 5) + 32;
        let ff = f.toFixed(2);
        return ff;
}

function dateMaker(d) {
        let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        let date = d.getDate();
        let month = months[d.getMonth()];
        let day = days[d.getDay()];
        let year = d.getFullYear();

        return `${day}, ${date} ${month} ${year}`;
}