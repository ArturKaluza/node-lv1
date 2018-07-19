const { ObjectID } = require('mongodb')
const request = require('supertest');
const {app} = require('../server/server');
const crypto = require('crypto');

const {Camera} = require('../db/models/Camera');
const {Phone} = require('../db/models/Phone');
const {TV} = require('../db/models/TV');
const Users = require('../db/models/Users');

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

// removing all users from DB
const refreshUsers = () => {
  Users.remove({})
    .then(() => {
      checkUser();
      checkUser1();
    })
    .catch(e => console.log(e));
}

refreshUsers();

// create user for login
const checkUser = () => {
  Users.find({name: 'Test'})
    .then(doc => {
      if (doc.length < 1) {
        // hashing password to compare when user login
        const password = crypto.createHmac('sha256', 'test123').digest('hex');

        const user = new Users({name: 'Test', password})

        user.save()
      }
      return;
    })
}

// create user for deleting test
const checkUser1 = () => {
  Users.find({})
    .then(doc => {
      if (doc.length < 2) {
        const password = crypto.createHmac('sha256', 'test123').digest('hex');

        const user = new Users({name: 'Nowy', password})

        user.save()
      }
      return;
    })
}

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

const refreshCameras = (done) => {
  Camera.remove({})
    .then(() => {
      return Camera.insertMany(items);
    })
    .then(() => done());
};

const refreshPhones = (done) => {
  Phone.remove({})
    .then(() => {
      return Phone.insertMany(items);
    })
    .then(() => done());
};

const refreshTVs = (done) => {
  TV.remove({})
    .then(() => {
      return TV.insertMany(items);
    })
    .then(() => done());
};

module.exports = { items, refreshCameras, refreshPhones, refreshTVs, itemsOneId, itemsTwoId, auth, loginUser, getUserId, user, refreshUsers, checkUser, checkUser1 };