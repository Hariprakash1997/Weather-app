const request = require('request');

var geocode = (address) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {

            var encodedAddress = encodeURIComponent(address);
            request({
                url:`https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&sensor=true&key=AIzaSyA6vvoQi4GrJ3kyoABBITbrj9x7X8uHAKw`,
                json: true
            },(error, response, body) => {
                if(error) {
                    reject('Unable to connect to google servers.');
                } else if(body.status === 'ZERO_RESULTS'){
                    reject('Unable to find your address');
                } else if(body.status === 'OK'){
                    resolve({
                        address:body.results[0].formatted_address,
                        latitude:body.results[0].geometry.location.lat,
                        longitude:body.results[0].geometry.location.lng
                    });
                }
            });

        }, 1000);
    })
};

geocode("20182").then((location) => {
    console.log(`Location: ${JSON.stringify(location, undefined, 2)}`);
}, (error) => {
    console.log(`error: ${error}`);
});