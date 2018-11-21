const yargs = require('yargs');
const axios = require('axios');

const argv = yargs
    .options({
        a: {
            demand: true,
            alias: 'address',
            describe: 'Address to fetch the weather',
            string: true
        }
    })
    .help()
    .alias('help', 'h')
    .argv;

var encodedAddress = encodeURIComponent(argv.address);
var geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&sensor=true&key=AIzaSyA6vvoQi4GrJ3kyoABBITbrj9x7X8uHAKw`;

axios.get(geocodeUrl).then((response) => {

    if(response.data.status === 'ZERO_RESULTS'){
        throw new Error('Unable to find that address.');
    }
    var latitude = response.data.results[0].geometry.location.lat;
    var longitude = response.data.results[0].geometry.location.lng;
    var weatherUrl = `https://api.darksky.net/forecast/9b7ae36b51770111cab61812b4ced1af/${latitude},${longitude}`;
    console.log(`Address: ${response.data.results[0].formatted_address}`);
    return axios.get(weatherUrl);
    
}).then((response) => {
    var temperature = response.data.currently.temperature;
    var apparentTemperature = response.data.currently.apparentTemperature;
    console.log(`The temperature is ${temperature} and the apparent temperature is ${apparentTemperature}`);
}).catch((e) => {
    if(e.code === 'ENOTFOUND'){
        console.log('Unable to connect to api server.');
    } else {
        console.log(e.message);
    }
});
