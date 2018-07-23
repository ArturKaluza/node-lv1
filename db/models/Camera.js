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
        required: true,
        es_indexed:true
    },
    price: {
        type: Number,
        require: true,
        es_indexed: true
    },
    desc: {
        type: String,
        required: true,
        es_indexed:true
    },
    itemType: {
        type: String,
        default: 'Camera',
        es_indexed: true,
    }
});

// add pagination to Schema
CameraSchema.plugin(mongoosePaginate);
CameraSchema.plugin(mongoosastic, { bulk: {
    size: 10
}});

const Camera = mongoose.model('Camera', CameraSchema);

// CameraSchema.methods.checkExsits = () => {
//     Camera.find({})
//         .then(docs => {
//             if (docs.length < 1) {
//                 new Promise(addItems('Camera').forEach(item => {
//                     const newItem = new Camera(item);
//                     newItem.save();
                    
//                 }), e => console.log(e)
//             )}
//         })
//         .catch(e => console.log(e))
// }

// CameraSchema.checkExsits();
const checkCamera = async () => {
    const docs = await Camera.find({})

    if (docs.length < 1) {
        new Promise((addItems('Camera')
            .forEach(item => {
                const newItem = new Camera(item);
                newItem.save()
            }) 
        ),(e) => console.log(e))
    }
}

if (process.env.NODE_ENV !== 'test') {
    checkCamera();
}

module.exports = {Camera};