const express = require('express');
const bodyParser = require('body-parser');

const mongoose = require('../db/db');

const app = express();

app.use(bodyParser.json());

const camera = require('./routes/camera');
const tv = require('./routes/TV');
const phone = require('./routes/phone');

app.get('/', (req, res) => {
    res.send('work');
});

// query params url= localhost:3000/test?get=1&&limit=10
app.get('/test', (req, res) => {
    console.log(req.query);
    res.send('query')
});

app.use('/product/camera', camera);
app.use('/product/tv', tv);
app.use('/product/phone', phone);

app.listen(3000, () => {
    console.log('port: 3000');
});