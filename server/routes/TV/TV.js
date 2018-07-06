const express = require('express');
const router = express.Router();

const {TV} = require('../../../db/models/TV');

router.get('/', (req, res) => {
  let {page, limit} = req.query;
  
  // get all camreas
  // url constuction = localhost:3000/camera
  
  if (page === undefined && limit === undefined) {
    TV.find({}).then(doc => {
      if (doc.length < 1) {
        return TV.collection.insert(add20TV())
          .then(docs => res.send(docs))
          .catch(e => res.status(400).send(e));
      }
      res.send(doc)
    }, e => res.status(400).send(e));
    
  } else {
    // checking query params
    page === undefined ? page = 1 : page = parseInt(page);
    limit === undefined ? limit = 5 : limit = parseInt(limit);
      
    // add pagination 
    TV.paginate({}, {page, limit}).then(response => {
      if (response.docs.length < 1) {
        return TV.collection.insert(add20TV())
          .then(() => TV.paginate({}, {page, limit}))
          .then(docs => res.send(docs))
          .catch(e => res.status(400).send(e));
      }

      res.send(response);
    }, e => res.status(400).send(e));
  }  
});

// create 
router.post('/new', (req, res) => {
  const {name, amount, price, desc} = req.body;
  
  // checking data
  if (name === undefined || amount === undefined || price === undefined || desc === undefined) {
    return res.status(400).send();
  }

  const tv = new TV({name, amount, price, desc});

  tv.save().then(item => {
    res.status(201).send(item);
  }, e => res.status(400).send(e));
})

// find one item
router.get('/:id', (req, res) => {
  const id = req.params.id;

  TV.findById(id).then(item => {
    if (!item) {
      return res.status(404).send();
    }

    res.send(item);
  }, e => res.status(400).send(e));
});

// delete one item by id
router.delete('/:id', (req, res) => {
  const id = req.params.id;

  TV.findByIdAndRemove(id).then(item => {
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

  TV.findByIdAndUpdate(id, {name, amount, desc, price}, {new: true}, (e, doc) => {
    if (!doc) {
      return res.status(404).send();
    }
    res.send(doc)
  }, e => res.status(400).send(e));
})

module.exports = router;

const add20TV = () => {
  const tv = [];

  for (let i = 0; i < 20; i++) {
    tv.push({
      name: 'TV item' + i,
      amount: 100,
      price: 99,
      desc: 'amazing item ' + i
    });
  }

  return tv;
};