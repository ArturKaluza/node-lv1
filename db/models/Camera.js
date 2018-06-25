const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CameraSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        require: true
    },
    desc: {
        type: String,
        required: true
    }
});

const Camera = mongoose.model('Camera', CameraSchema);

module.exports = {Camera};