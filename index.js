const axios = require('axios');
const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const API_KEY = '633be368f95913639382d698b33f953b';

app.post('/', function (req, res) {
    const CITY = req.body.text;
    const URL = `http://api.openweathermap.org/data/2.5/weather?q=${CITY}&appid=${API_KEY}&units=metric`;

    axios.get(URL)
    .then(function (response) {
        const wdata = response.data;
        res.json({
            text: `The weather in ${wdata.name} (${wdata.sys.country})`,
            attachments: [
                {
                    title: wdata.weather[0].description,
                    text: `The current temperature is ${wdata.main.temp} (Low: ${wdata.main.temp_min} High: ${wdata.main.temp_max})`,
                    thumb_url: `http://openweathermap.org/img/w/${wdata.weather[0].icon}.png`
                }
            ]
        })
    })
    .catch(function (response) {
        res.json(response)
    });
});

app.set('port', (process.env.PORT || 5000));

app.listen(app.get('port'), function () {
    console.log('express listening on port ', app.get('port'));
});
