const yargs = require('yargs');

const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');

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

geocode.geocodeAddress(argv.address, (errorMessage, results) => {
    if(errorMessage){
        console.log(errorMessage);
    } else {
        console.log(`Address: ${results.address}`);
        weather.weatherForecast(results, (errorMessage, weatherResult) => {
            if(errorMessage){
                console.log(errorMessage);
            } else {
                console.log(`Weather: It is currently ${weatherResult.temperature}. It is ${weatherResult.summary}y` );
            }
        });
    }
});

// 9b7ae36b51770111cab61812b4ced1af