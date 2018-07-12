const express = require('express');
const bodyParser = require('body-parser');

const mongoose = require('../db/db');

const passport = require('passport');

require('./passport');

const app = express();

app.use(bodyParser.json());
// app.use(passport.initialize());
// app.use(passport.session());

const products = require('./routes/products/products');

const camera = require('./routes/camera/camera');
const tv = require('./routes/TV/TV');
const phone = require('./routes/phone/phone');
const search = require('./routes/search/search');
const users = require('./routes/users/users');
const auth = require('./routes/auth/auth');

// CORS enable 
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.get('/test', (req, res) => {
    console.log(req.rawHeaders[3]);
})

app.get('/', (req, res) => {
    res.send('work');
});

app.use('/product', products);

app.use('/product/camera', camera);
app.use('/product/tv', tv);
app.use('/product/phone', passport.authenticate('jwt', {session: false}), phone);

app.use('/search/', search);

app.use('/auth', auth);
app.use('/users', users);

app.listen(3000, () => {
    console.log('port: 3000');
});

module.exports = {app};


// try use browse postman request not use localstorage to save token