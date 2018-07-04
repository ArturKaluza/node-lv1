const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate');
const mongoosastic = require('mongoosastic');

const { addItems } = require('../util');

const CameraSchema = new Schema({
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
CameraSchema.plugin(mongoosePaginate);
CameraSchema.plugin(mongoosastic);

const Camera = mongoose.model('Camera', CameraSchema);

Camera.find({})
    .then(docs => {
        if (docs.length < 1) {
            new Promise(addItems('Camera').forEach(item => {
                const newItem = new Camera(item);
                newItem.save();
                
            }), e => console.log(e)
        )}
    })
    .catch(e => console.log(e))
    


module.exports = {Camera};