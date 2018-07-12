const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

const Users = require('../../../db/models/Users');

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
          const password = password1;
          const user = new Users({name, password});
          
          user.save()
              .then(doc => res.status(201).send(doc))
              .catch(e => res.status(400).send(e))

          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(user.password, salt, (err, hash) => {
              if (err) throw err;
              user.password = hash;
              // genSalt asynchronus
              user.save()
              .then(doc => res.status(201).send(doc))
              .catch(e => res.status(400).send(e))
            })
          })        
        } else {
          res.status(400).json({error: "diffrent password"})
        }
      }
    })  
});

// router.post('/login', (req, res) => {
//   const { name, password } = req.body

//   Users.findOne({name})
//     .then(user => {
//       if (!user) return res.status(404).json({error: 'User not found'});

//       // compare password
//       bcrypt.compare(password, user.password)
//         .then(bool => {
//           if (!bool) {
//             res.status(400).json({error: 'Password or login not correct'});
//           }
//           // if true then authenticate
//           res.json({msg: 'Auth true'})
//         })

//     })
//     .catch(e => res.status(400).send(e))

// })

module.exports = router;