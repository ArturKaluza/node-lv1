const { ObjectID } = require('mongodb')
const request = require('supertest');
const {app} = require('../server/server');

const {Camera} = require('../db/models/Camera');
const {Phone} = require('../db/models/Phone');
const {TV} = require('../db/models/TV');

const itemsOneId = new ObjectID();
const itemsTwoId = new ObjectID();

const items = [{
  _id: new ObjectID(),
  name: 'test item1',
  price: 29,
  amount: 30,
  desc: 'test item1'  
}, {
  _id: new ObjectID(),
  name: 'test item2',
  price: 19,
  amount: 50,
  desc: 'test item2'
}];

// initialize object to get user id
const user = {};

function getUserId(user) {
  return done => {
      request(app)
          .get('/users')
          .expect(200)
          .end(onResponse);

      function onResponse(err, res) {
          user.id = res.body[1]._id;
          return done();
      }
  };
}

// initialize object to get token
const auth = {};

// getting fresh token
function loginUser(auth) {
  return done => {
      request(app)
          .post('/auth/login')
          .send({
              name: 'Test',
              password: 'test123'
          })
          .expect(200)
          .end(onResponse);

      function onResponse(err, res) {
          auth.token = res.body.token;
          return done();
      }
  };
}

const populateCameras = (done) => {
  Camera.remove({})
    .then(() => {
      return Camera.insertMany(items);
    })
    .then(() => done());
};

const populatePhones = (done) => {
  Phone.remove({})
    .then(() => {
      return Phone.insertMany(items);
    })
    .then(() => done());
};

const populateTVs = (done) => {
  TV.remove({})
    .then(() => {
      return TV.insertMany(items);
    })
    .then(() => done());
};

module.exports = { items, populateCameras, populatePhones, populateTVs, itemsOneId, itemsTwoId, auth, loginUser, getUserId, user };