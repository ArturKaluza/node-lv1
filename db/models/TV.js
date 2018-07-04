const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate');
const mongoosastic = require('mongoosastic');

const { addItems } = require('../util');

const TVSchema = new Schema({
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
TVSchema.plugin(mongoosePaginate);
TVSchema.plugin(mongoosastic);

const TV = mongoose.model('TV', TVSchema);

TV.find({})
    .then(docs => {
        if (docs.length < 1) {
            new Promise(addItems('TV').forEach(item => {
                const newItem = new TV(item);
                newItem.save();
                
            }), e => console.log(e)
        )}
    })
    .catch(e => console.log(e))

module.exports = {TV};