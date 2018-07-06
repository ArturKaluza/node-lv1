const express = require('express');
const bodyParser = require('body-parser');

const mongoose = require('../db/db');

const app = express();

app.use(bodyParser.json());

const products = require('./routes/products/products');

const camera = require('./routes/camera/camera');
const tv = require('./routes/TV/TV');
const phone = require('./routes/phone/phone');
const search = require('./routes/search/search');

// CORS enable 
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.use((req, res, next) => {
    const url = req.url;
    next();
})

app.get('/', (req, res) => {
    res.send('work');
});

app.use('/product', products);

app.use('/product/camera', camera);
app.use('/product/tv', tv);
app.use('/product/phone', phone);

app.use('/search/', search);

app.listen(3000, () => {
    console.log('port: 3000');
});

module.exports = app;