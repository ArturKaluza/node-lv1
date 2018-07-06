const express = require('express');
const router = express.Router();

const {Phone} = require('../../../db/models/Phone');
const {Camera} = require('../../../db/models/Camera');
const {TV} = require('../../../db/models/TV');

router.get('/', (req, res) => {
  //  get all item from collestions  
  Promise.all([Phone.find(), Camera.find({}), TV.find({})]).then(doc => {
        
    // concat response
    const allItem = [].concat(doc[0], doc[1], doc[2]);
    
    res.send(allItem);
  }, e => console.log(e));
})

module.exports = router;