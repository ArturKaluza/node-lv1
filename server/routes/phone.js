const express = require('express');
const router = express.Router();

const {Phone} = require('../../db/models/Phone');

router.get('/', (req, res) => {
  let {page, limit} = req.query;
  
  // get all camreas
  // url constuction = localhost:3000/camera
  
  if (page === undefined && limit === undefined) {
    Phone.find({}).then(doc => {
      if (doc.length < 1) {
        return Phone.collection.insert(add20Phone())
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
    Phone.paginate({}, {page, limit}).then(response => {
      if (response.docs.length < 1) {
        return Phone.collection.insert(add20Phone())
          .then(() => Phone.paginate({}, {page, limit}))
          .then(docs => res.send(docs))
          .catch(e => res.status(400).send(e));
      }

      res.send(response);
    }, e => res.status(400).send(e));
  }  
});


// router.get('/', (req, res) => {
//   Phone.find({}).then(doc => {
    
//     // insert 20 new phone if Phons length < 5
//     if (doc.length < 5) { 
//       Phone.collection.insert(add20Phone(), function(error, docs) {
//         if (error) {
//           return res.status(400).send(error);
//         }

//         return res.send(docs);
//       })
//     }
//     // if there is more than 5 cameras in collection - send all
//     return res.send(doc);
//   }, e => res.status(400).send(e));
// });

router.post('/new', (req, res) => {
  const {name, amount, price, desc} = req.body;
  
  // checking data
  if (name === undefined || amount === undefined || price === undefined || desc === undefined) {
    return res.status(400).send();
  }

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

const add20Phone = () => {
  const phone = [];

  for (let i = 0; i < 20; i++) {
    phone.push({
      name: 'Phone item' + i,
      amount: 100,
      price: 99,
      desc: 'amazing item phone ' + i
    });
  }

  return phone;
};