const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    unique: true,
    require: true
  },
  password: {
    type: String,
    minlength: 6,
    require: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  lastLogin: {
    type: Date,
  }
})

const User = mongoose.model('User', UserSchema);

module.exports = User;