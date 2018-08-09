const express = require('express');
const data = require('./data');

const API_ENDPOINT = parseInt(process.env.API_ENDPOINT || '5000');
const OPERATION_PATH = '/api/operations/';

const app = express();

const handler = function (req, res, key)  {
    const error = data[req.params.uuid].error;
    if (error && error[req.method]) {
        res.status(error[req.method]);
        res.send('')
    } else {
        res.json(data[req.params.uuid][key]);
    }
};

app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', ['*']);
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST');
    res.append('Access-Control-Allow-Headers', 'Content-Type');
    next()
});

app.route(`${OPERATION_PATH}:uuid`)
    .get(function(req, res) {
        handler(req, res, 'request');
    })
    .put(function(req, res) {
        handler(req, res, 'response');
    });

app.listen(API_ENDPOINT, function () {
    console.log(`Server listening on port ${API_ENDPOINT}\n`);
    Object.keys(data).forEach(function (k) {
        console.log(`${OPERATION_PATH}${k}`);
        console.log(`    ${data[k].description}`)
    })
});
