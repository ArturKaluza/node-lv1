const {Camera} = require('../db/models/Camera');
const {Phone} = require('../db/models/Phone');
const {TV} = require('../db/models/TV');

const items = [{
  name: 'test item1',
  desc: 'test item1',
  price: 100,
  amount: 20
}, {
  name: 'test item2',
  desc: 'test item2',
  price: 200,
  amount: 10
}];

const populateCameras = done => {
  Camera.remove({}).then(() => {
    return Camera.insertMany(items);
  }, e => console.log(e))
  .then(() => done())
  .catch(e => console.log(e))
};

module.exports = { items, populateCameras };