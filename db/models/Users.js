const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    minlength: 4,
    unique: true,
    require: true
  },
  password: {
    type: String,
    minlength: 6,
    require: true
  }
})

const User = mongoose.model('User', UserSchema);

module.exports = User;