const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
const { json } = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.set("view engine", "hbs");
app.set('views', __dirname + '/public');

app.get('/', (req, res) => {
    res.render('index' , {
        icon: "fas fa-sun"
    });
});

app.post('/', (req, res) => {
    const api = {
        key: "c2030c381789a39aad2dab779571c197",
        base: "https://api.openweathermap.org/data/2.5/"
    }
    fetch(`${api.base}weather?q=${req.body.cityname}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then((data) => {
            res.render('index' , {
                temp: Math.round(data.main.temp),
                min_temp: Math.round(data.main.temp_min),
                max_temp: Math.round(data.main.temp_max),
                weather_condition: data.weather[0].main,
                city: data.name,
                country: data.sys.country,
                icon: `${data.weather[0].main == "Sunny" || data.weather[0].main == "Clear" ? "fas fa-sun orange" : data.weather[0].main == "Haze" ? "fas fa-water white" : data.weather[0].main == "Rain" ? "fa fa-cloud-rain white" : data.weather[0].main == "Clouds" ? "fa fa-cloud white" : data.weather[0].main == "Smog" ? "fa fa-smog white" : data.weather[0].main == "Smoke" ? "fa fa-smog white" : data.weather[0].main == "snow" ? "fa fa-snowflake white" : data.weather[0].main == "Fog" ? "fas fa-water white" : false}`
            })
        })
        .catch((err) => {
            res.render('index', {
                city: "City Not Found"
            })
        })
})


app.listen(3000);