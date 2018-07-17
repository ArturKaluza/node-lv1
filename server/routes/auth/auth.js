const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const passport = require('passport');
const keys = require('../../../config/keys');

const  Users = require('../../../db/models/Users');

// POST login
router.post('/login', (req, res, next) => {
  
  passport.authenticate('local', {session: false}, (err, user, info) => {
    if (err || !user) {
      res.status(404).json({
        message: 'Wrong user name or password',
        user: user
      })
    }

    // update users model lastLogin property
    Users.findOneAndUpdate({name: user.name}, {lastLogin: Date.now()}, {new: true})
      .catch(e => res.status(400).send(e));

    req.login(user, {session: false}, err => {
      if (err) {
        res.send(err)
      }
      // generate token
      const token = jwt.sign(user.toJSON(), keys.secret);
      // set token value to session storage
      req.session.token = token;

      return res.json({user, token}) 
    });
  })(req, res);
});

module.exports = router;