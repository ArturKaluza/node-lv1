const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate');
const mongoosastic = require('mongoosastic');

const { addItems } = require('../util');

const PhoneSchema = new Schema({
    name: {
        type: String,
        required: true,
        es_indexed:true
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
PhoneSchema.plugin(mongoosastic);

const Phone = mongoose.model('Phone', PhoneSchema);

Phone.find({})
    .then(docs => {
        if (docs.length < 1) {
            new Promise(addItems('Phone').forEach(item => {
                const newItem = new Phone(item);
                newItem.save();
                
            }), e => console.log(e)
        )}
    })
    .catch(e => console.log(e))

module.exports = {Phone};