const express = require('express');
const bodyParser = require('body-parser');

const mongoose = require('../db/db');

const app = express();

app.use(bodyParser.json());

const products = require('./routes/products');

const camera = require('./routes/camera');
const tv = require('./routes/TV');
const phone = require('./routes/phone');

// CORS enable 
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.get('/', (req, res) => {
    res.send('work');
});


app.use('/product', products);

app.use('/product/camera', camera);
app.use('/product/tv', tv);
app.use('/product/phone', phone);

app.listen(3000, () => {
    console.log('port: 3000');
});