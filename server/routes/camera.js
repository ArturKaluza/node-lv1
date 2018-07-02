const express = require('express');
const router = express.Router();

// import camera model
const {Camera} = require('../../db/models/Camera');

// get all cameras
// url construction = localhost:3000/camera?page=1&&limit=4

router.get('/', (req, res) => {
  let {page, limit} = req.query;
  
  // get all camreas
  // url constuction = localhost:3000/camera
  
  if (page === undefined && limit === undefined) {
    Camera.find({}).then(doc => {
      if (doc.length < 1) {
      // zamknąć add20Cameras w promisie
      // następnie .then z Camera.find({})
      
        add20Cameras().forEach((item, index) => {
          const camera = new Camera(item);
          
          camera.save().then(doc => {
            doc.on('es-indexed', function(err, res){
            if (err) throw err;
            return Promise.resolve()
            })
          });
        });
      }
    Promise.resolve() 
    }).then()
    res.send(doc);
  }, e => res.status(400).send(e));    
        //     return Camera.collection.insert(add20Cameras())
    //       .then(docs => res.send(docs))
    //       .catch(e => res.status(400).send(e));
    //   }
    //   res.send(doc)
    // }, e => res.status(400).send(e));
    
  } else {
    // checking query params
    page === undefined ? page = 1 : page = parseInt(page);
    limit === undefined ? limit = 5 : limit = parseInt(limit);
      
    // add pagination 
    Camera.paginate({}, {page, limit}).then(response => {
      if (response.docs.length < 1) {
        return Camera.collection.insert(add20Cameras())
          .then(() => Camera.paginate({}, {page, limit}))
          .then(docs => res.send(docs))
          .catch(e => res.status(400).send(e));
      }

      res.send(response);
    }, e => res.status(400).send(e));
  }  
});
  
  
// create new Camera
router.post('/new', (req, res) => {
  const {name, amount, price, desc} = req.body;
  
  // checking data
  if (name === undefined || amount === undefined || price === undefined || desc === undefined) {
    return res.status(400).send();
  }

  const camera = new Camera({name, amount, price, desc});

  camera.save().then(item => {
    res.status(201).send(item);
  }, e => res.status(400).send(e));
})

// find one item
router.get('/:id', (req, res) => {
  const id = req.params.id;

  Camera.findById(id).then(item => {
    if (!item) {
      return res.status(404).send();
    }

    res.send(item);
  }, e => res.status(400).send(e));
});

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


// util function
const add20Cameras = () => {
  const cameras = [];

  for (let i = 0; i < 20; i++) {
    cameras.push({
      name: 'item' + i,
      amount: 100,
      price: 99,
      desc: 'amazing item ' + i
    });
  }

  return cameras;
};