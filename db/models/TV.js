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
        required: true,
        es_indexed:true
    },
    price: {
        type: Number,
        require: true,
        es_indexed:true
    },
    desc: {
        type: String,
        required: true,
        es_indexed:true
    },
    itemType: {
        type: String,
        default: 'TV',
        es_indexed: true,
    }
});

// add pagination to Schema
TVSchema.plugin(mongoosePaginate);
TVSchema.plugin(mongoosastic);

const TV = mongoose.model('TV', TVSchema);

// populate item for development mode
if (process.env.NODE_ENV !== 'test') {
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
}

module.exports = {TV};