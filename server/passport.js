const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const Users = require('../db/models/Users');
const keys = require('../config/keys');

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
  console.log(jwtPayload)
  return Users.findById(jwtPayload.id)
    .then(user => {
      return cb(null, user);
    })
    .catch(err => {
      return cb(err);
    })
}))