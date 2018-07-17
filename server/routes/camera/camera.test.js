const {app} = require('../../server');
const request = require('supertest');
const assert = require('chai').assert;
const crypto = require('crypto');
const fetch = require('node-fetch');

const Camera = require('../../../db/models/Camera');
const Users = require('../../../db/models/Users');

// inicjalize object  to get token
const auth = {};

before(loginUser(auth))

function loginUser(auth) {
  return function(done) {
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

// start testing
describe('Camera', () => {
  it('GET should return all cameras', (done) => {
    request(app)
      .get('/product/camera')
      .expect(200)
      .expect(res => {
        assert.equal(res.body[0].price, 100, 'correct');
        assert.equal(res.body[0].amount, 20, 'incorrect');
      })
      .end(done);
  });

  it('GET should return one item', (done) => {
    request(app)
      .get('/product/camera/5b4dd3ad9557fe1898cd5efb')
      .expect(200)
      .expect(res => {
        assert.equal(res.body.name, 'test item2', 'compare name');
        assert.equal(res.body.amount, 10);
        assert.isObject(res.body, 'res body is object');
      })
      .end(done);
  });

  it('GET should return status 404', done => {
    request(app)
      .get('/product/camera/5b4dd3ad9557fe1898cd5eaa')
      .expect(404)
      .end(done);
  });

  it('POST should not create item 401', done => {
    const camera = {
      name: 'test',
      desc: 'test',
      price: 34,
      amount: 10
    }
    
    request(app)
      .post('/product/camera/new')
      .send(camera)
      .expect(401)
      .end(done);
  })

  it('POST should create item', done => {
    const camera = {
      name: 'test',
      desc: 'test',
      price: 34,
      amount: 10
    }

    request(app)
      .post('/product/camera/new')
      .set('Authorization', 'bearer ' + auth.token)
      .send(camera)
      .expect(201)
      .expect(res => {
        assert.equal(res.body.name, 'test');
        assert.equal(res.body.price, 34);
        assert.equal(res.body.amount, 10)
      })
      .end(done);
  })

})