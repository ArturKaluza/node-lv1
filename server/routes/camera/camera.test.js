const {app} = require('../../server');
const request = require('supertest');
const assert = require('chai').assert;

const {Camera} = require('../../../db/models/Camera');


const { items, refreshCameras, auth, loginUser } = require('../../../test/testEnv');

before(loginUser(auth))
before(refreshCameras);

// start testing
describe('Camera', () => {
  it('GET should return all cameras', (done) => {
    request(app)
      .get('/product/camera')
      .expect(200)
      .expect(res => {
        assert.equal(res.body[0].price, 29, 'correct');
        assert.equal(res.body[0].amount, 30, 'correct');
        assert.equal(res.body.length, 2);
      })
      .end(done);
  });

  it('GET should return one item', (done) => {
    request(app)
      .get(`/product/camera/${items[1]._id}`)
      .expect(200)
      .expect(res => {
        assert.equal(res.body.name, 'test item2', 'compare name');
        assert.equal(res.body.amount, 50);
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

  it('POST should create another item', done => {
    const testItem = {
      name: 'test4',
      desc: 'test4',
      price: 45,
      amount: 15
    }

    request(app)
      .post('/product/camera/new')
      .set('Authorization', 'bearer ' + auth.token)
      .send(testItem)
      .expect(201)
      .end(done);
      
      Camera.find({})
        .then((docs) => {
          assert.equal(docs.length, 3)
        })
        .then(() => done)
        .catch(e => done(e));
  });

  
  it('DELETE should delete one item', done => {
    request(app)
      .delete(`/product/camera/${items[1]._id}`)
      .set('Authorization', 'bearer ' + auth.token)
      .expect(200)
      .end(done);
  })
})