const mongoose = require('mongoose');

const Camera = require('./models/Camera');

mongoose.Promise = global.Promise;

const env = process.env.NODE_ENV || 'development';

if (env === 'test') {
  mongoose.connect('mongodb://localhost:27017/node1-test')
} else {
  mongoose.connect('mongodb://localhost:27017/node1')
  // .then(() => console.log('db connect'))
  // .catch(e => console.log(e))
}

module.exports = mongoose;

