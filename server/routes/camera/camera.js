const express = require('express');
const router = express.Router();
const passport = require('passport');

// import camera model
const {Camera} = require('../../../db/models/Camera');

// get all cameras async/await
// url construction = localhost:3000/camera?page=1&&limit=4

router.get('/', async (req, res) => {
  let {page, limit} = req.query;
  
  // get all camreas
  // url constuction = localhost:3000/camera
  
  if (page === undefined && limit === undefined) {
    try {
      const doc = await Camera.find({});
      if (!doc) {
        res.status(404).end();
      }
      res.send(doc);

    } catch (e) {
      res.status(400).end();
    }
        
  } else {
    // checking query params
    page === undefined ? page = 1 : page = parseInt(page);
    limit === undefined ? limit = 5 : limit = parseInt(limit);
      
    // add pagination 
    try {
      const paginateItem = await Camera.paginate({}, {page, limit});
      if (!paginateItem) res.status(404).end();

      res.send(paginateItem);
    } catch (e) {
      res.status(400).send(e);
    }
  }  
});
    
// create new Camera
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

  // creating new item
  const camera = new Camera({name, amount, price, desc});

  camera.save().then(item => {
    res.status(201).send(item);
  }, e => res.status(400).send(e));
})

// find one item async/await
router.get('/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const item = await Camera.findById(id);
    if (!item) {
      return res.status(404).end()
    }
    res.send(item);
  
  } catch (e) {
    res.send(e)
  }
})

// delete one item by id
router.delete('/:id', (req, res) => {
  const id = req.params.id;

  Camera.findByIdAndRemove(id).then(item => {
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

  Camera.findByIdAndUpdate(id, {name, amount, desc, price}, {new: true}, (e, doc) => {
    if (!doc) {
      return res.status(404).send();
    }
    res.send(doc)
  }, e => res.status(400).send(e));
})

module.exports = router;