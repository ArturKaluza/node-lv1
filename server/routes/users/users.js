const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const passport = require('passport');

const Users = require('../../../db/models/Users');

// Get all users
router.get('/', async (req, res) => {
  try {
  const docs = await Users.find({});
  res.send(docs);
  } catch (e) {
    res.status(400).send(e);
  }  
})


// Add new User
router.post('/create', (req, res) => {
  const {name, password1, password2} = req.body;
  // checking password
  if (password1 === undefined || password2 === undefined) return res.status(400).json({msg: 'password required'});

  Users.findOne({name})
    .then(user => {
      if (user) {
        return res.status(400).json({msg: 'User already exist'})
      } else {
        // checking password compatibility and creating new user
        if (password1 === password2) {
          const password = crypto.createHmac('sha256', password1).digest('hex');
          const user = new Users({name, password});
          
          user.save()
              .then(doc => res.status(201).send(doc))
              .catch(e => res.status(400).send(e))
     
        } else {
          res.status(400).json({error: "diffrent password"})
        }
      }
    })  
});

// delete user
router.delete('/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
  const id = req.params.id;

  Users.findByIdAndRemove(id)
    .then(doc => {
      if (!doc) {
        res.status(404).json({error: 'User not found'});
      }
      res.json({mag: 'delete success'})
    
    })
    .catch(e => res.status(400).send(e))

})

module.exports = router;