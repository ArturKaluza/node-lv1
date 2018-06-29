const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate');

const PhoneSchema = new Schema({
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
PhoneSchema.plugin(mongoosePaginate);

const Phone = mongoose.model('Phone', PhoneSchema);

module.exports = {Phone};