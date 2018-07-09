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
    }
});

// add pagination to Schema
PhoneSchema.plugin(mongoosePaginate);
PhoneSchema.plugin(mongoosastic);

const Phone = mongoose.model('Phone', PhoneSchema);

// populate item for development mode
if (process.env.NODE_ENV !== 'test') {
    Phone.find({})
    .then(docs => {
        if (docs.length < 1) {
            new Promise((docs) => addItems('Phone').forEach(item => {
                const newItem = new Phone(item);
                newItem.save();
                
            }), e => console.log(e)
        )}
    })
    .catch(e => console.log(e))
} 



module.exports = {Phone};