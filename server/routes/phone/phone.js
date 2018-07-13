const express = require('express');
const router = express.Router();
const passport = require('passport');

const {Phone} = require('../../../db/models/Phone');

router.get('/', (req, res) => {
  let {page, limit} = req.query;
  
  // get all camreas
  // url constuction = localhost:3000/camera
  
  if (page === undefined && limit === undefined) {
    Phone.find({}).then(doc => {
      return res.send(doc)
    }, e => res.status(400).send(e));
    
  } else {
    // checking query params
    page === undefined ? page = 1 : page = parseInt(page);
    limit === undefined ? limit = 5 : limit = parseInt(limit);
      
    // add pagination 
    Phone.paginate({}, {page, limit}).then(response => {
      res.send(response);
    }, e => res.status(400).send(e));
  }  
});

// POST new Phone
router.post('/new', passport.authenticate('jwt', {session: false}), (req, res) => {
  const {name, desc} = req.body;
  let {price, amount} = req.body;
  
  price = parseInt(price);
  amount = parseInt(amount);

  // checking properties
  if (typeof name !== 'string' || name === '') return res.status(400).json({Error: 'Wrong Name'});
  if (typeof desc !== 'string' || desc === '') return res.status(400).json({Error: 'Wrong Description'});
  if (typeof price !== 'number' || price <= 0) return res.status(400).json({Error: 'Wrong Price'});
  if (typeof amount !== 'number' || amount <= 0) return res.status(400).json({Error: 'wrong Amount'});
  
  const phone = new Phone({name, amount, price, desc});

  phone.save().then(item => {
    res.status(201).send(item);
  }, e => res.status(400).send(e));
})

// find one item
router.get('/:id', (req, res) => {
  const id = req.params.id;

  Phone.findById(id).then(item => {
    if (!item) {
      return res.status(404).send();
    }

    res.send(item);
  }, e => res.status(400).send(e));
});

// delete one item by id
router.delete('/:id', (req, res) => {
  const id = req.params.id;

  Phone.findByIdAndRemove(id).then(item => {
    if (!item) {
      return res.status(404).send();
    }

    return res.send();
  }, e => res.send(400).send(e));
});

// upadate item
router.patch('/:id', (req, res) => {
  // get item id
  const id = req.params.id

  // get body
  const {name, amount, price, desc} = req.body;
  
  // checking data
  if (name === undefined || amount === undefined || price === undefined || desc === undefined) {
    return res.status(400).send();
  }

  Phone.findByIdAndUpdate(id, {name, amount, desc, price}, {new: true}, (e, doc) => {
    if (!doc) {
      return res.status(404).send();
    }
    res.send(doc)
  }, e => res.status(400).send(e));
})

module.exports = router;