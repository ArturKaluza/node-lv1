const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const cors = require('cors');

const mongoose = require('../db/db');
const keys = require('../config/keys');

const passport = require('passport');

require('./passport');

const app = express();

// Cors middleware 
app.use(cors());

app.use(session({
    secret: keys.secret,
    resave: false,
    saveUninitialized: true,
    cookie: {}
}));

app.use(bodyParser.json());

// set authoryzation token if exsist
app.use((req, res, next) => {
    const token = 'bearer ' + req.session.token;
    res.header('Authorization', token);
    next()
});

const products = require('./routes/products/products');

const camera = require('./routes/camera/camera');
const tv = require('./routes/TV/TV');
const phone = require('./routes/phone/phone');
const search = require('./routes/search/search');
const users = require('./routes/users/users');
const auth = require('./routes/auth/auth');


app.get('/', (req, res) => {
    res.send('work');
});

app.use('/product', products);

app.use('/product/camera', camera);
app.use('/product/tv', tv);
app.use('/product/phone', phone);

app.use('/search/', search);

app.use('/auth', auth);
app.use('/users', users);

app.listen(3000, () => {
    console.log('port: 3000');
});

module.exports = {app};


//  passport middleware
//  passport.authenticate('jwt', {session: false})