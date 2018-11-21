const request = require('request');

const weatherForecast = (result, callback) => {
    request({
        url:`https://api.darksky.net/forecast/9b7ae36b51770111cab61812b4ced1af/${result.latitude},${result.longitude}`,
        json: true
    }, (error, response, body) => {
        if(!error && response.statusCode === 200) {
            callback(undefined, {
                summary: body.currently.summary,
                temperature: body.currently.temperature,
                apparentTemperature: body.currently.apparentTemperature
            });
        } else {
            callback('Unable to fetch weather');
        } 
    });
}


module.exports = {
    weatherForecast
}