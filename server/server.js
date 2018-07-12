const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');

const mongoose = require('../db/db');
const keys = require('../config/keys');

const passport = require('passport');

require('./passport');

const app = express();

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

// CORS enable 
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.get('/', (req, res) => {
    res.send('work');
});

// app.get('/test', (req, res) => {
//     console.log(req.session.token)
    
//     console.log(res.session.token);
//     res.send('test')
// })

app.get('/test2', passport.authenticate('jwt', {session: false}), (req, res) => {
    res.send({msg: 'protect'});
})

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