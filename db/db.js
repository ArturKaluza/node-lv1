const mongoose = require('mongoose');

const Camera = require('./models/Camera');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/node1')
  .then(() => console.log('db connect'))
  .catch(e => console.log(e))
  
module.exports = mongoose;

