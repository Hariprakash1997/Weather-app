// var somePromise = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         // resolve("Hey, it worked!");
//         reject(`Unable to fullfill promise`);
//     }, 2500);
// });

// somePromise.then((message) => {
//     console.log(`Success: ${message}`);
// }, (errorMessage) => {
//     console.log(`Error: ${errorMessage}`); 
// });

var asyncAdd = (a, b) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if(typeof a === 'number' && typeof b === 'number'){
                resolve(a + b);
            } else {
                reject('Arguments must be a number');
            }
        }, 1500);
    });
};

asyncAdd(5, 7).then((result) => {
    console.log(`success: ${result}`);
    return asyncAdd(result, 33);
}).then((res) => {
    console.log(`success: ${res}`);
}).catch((errorMessage) => {
    console.log(`error: ${errorMessage}`);
});