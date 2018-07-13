const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

const Users = require('../db/models/Users');
const keys = require('../config/keys');

// passport.use(passport.initialize());
passport.use(new LocalStrategy({
  usernameField: 'name',
  passwordField: 'password'
}, (name, password, cb) => {
  
  return Users.findOne({name, password})
    .then(user => {
      if (!user) {
        return cb(null, false, {message: 'Inccorect message or password'})
      }

      return cb(null, user, {message: 'Logged success'})
    })
    .catch(err => cb(err));
}))

// Part two
const passportJWT = require('passport-jwt');
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

passport.use(new JWTStrategy({
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: keys.secret
}, (jwtPayload, cb) => {
  return Users.findById(jwtPayload._id)
    .then(user => {
      return cb(null, user);
   })
    .catch(err => {
      return cb(err);
  })
}))

//authoryzation header example
// Authorization : Bearer (jwt-token) eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YjQ2MDk2OTJiYTQwMDAzZmMwYzJjMzUiLCJuYW1lIjoiQXJ0dXIiLCJwYXNzd29yZCI6InRlc3QxMjN0ZXN0IiwiX192IjowLCJpYXQiOjE1MzEzODI4MjR9.E67jwzuyi4mrKFYhilaFXiwm2bpVy8vw1aIuzYnC-LQ
