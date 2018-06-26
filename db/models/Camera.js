const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate');

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

// add pagination to Schema
CameraSchema.plugin(mongoosePaginate);

const Camera = mongoose.model('Camera', CameraSchema);

module.exports = {Camera};