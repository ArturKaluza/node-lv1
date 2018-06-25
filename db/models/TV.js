const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TVSchema = new Schema({
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

const TV = mongoose.model('TV', TVSchema);

module.exports = {TV};