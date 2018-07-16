const { ObjectID } = require('mongodb')

const {Camera} = require('../db/models/Camera');
const {Phone} = require('../db/models/Phone');
const {TV} = require('../db/models/TV');

const itemsOneId = new ObjectID();
const itemsTwoId = new ObjectID();

const items = [{
  _id: itemsOneId,
  name: 'test item1',
  desc: 'test item1',
  price: 100,
  amount: 20,
  }, {
  _id: itemsTwoId,
  name: 'test item2',
  desc: 'test item2',
  price: 200,
  amount: 10,
  id: 2
}];

const populateCameras = done => {
  Camera.remove({}).then(() => {
    return Camera.insertMany(items);
  })
  .then(() => done())
  .catch(e => console.log(e))
};

module.exports = { items, populateCameras, itemsOneId, itemsTwoId };