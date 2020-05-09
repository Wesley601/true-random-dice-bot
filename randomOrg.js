const axios = require('axios');
const config = require('./config.json');

exports.client = function (numberOfDices, min, max) {
    return axios({
        method: 'post',
        url: config.random_url,
        data: {
            jsonrpc: "2.0",
            method: "generateSignedIntegers",
            params: {
                apiKey: config.random_key,
                n: numberOfDices,
                min: min,
                max: max,
                replacement: true
            },
            id: 1,
        }
    });
}
