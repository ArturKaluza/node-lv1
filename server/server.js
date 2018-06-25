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


app.use('/camera', camera);
app.use('/tv', tv);
app.use('/phone', phone);

app.listen(3000, () => {
    console.log('port: 3000');
});