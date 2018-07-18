const {app} = require('../../server');
const request = require('supertest');
const assert = require('chai').assert;

const {TV} = require('../../../db/models/TV');


const { items, populateTVs, auth, loginUser } = require('../../../test/testEnv');

before(loginUser(auth))
before(populateTVs);

// start testing
describe('TV', () => {
  it('GET should return all tvs', (done) => {
    request(app)
      .get('/product/tv')
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
      .get(`/product/tv/${items[1]._id}`)
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
      .get('/product/tv/5b4dd3ad9557fe1898cd5eaa')
      .expect(404)
      .end(done);
  });

  it('POST should not create item 401', done => {
    const tv = {
      name: 'test',
      desc: 'test',
      price: 34,
      amount: 10
    }
    
    request(app)
      .post('/product/tv/new')
      .send(tv)
      .expect(401)
      .end(done);
  })

  it('POST should create item', done => {
    const tv = {
      name: 'test',
      desc: 'test',
      price: 34,
      amount: 10
    }

    request(app)
      .post('/product/tv/new')
      .set('Authorization', 'bearer ' + auth.token)
      .send(tv)
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
      .post('/product/tv/new')
      .set('Authorization', 'bearer ' + auth.token)
      .send(testItem)
      .expect(201)
      .end(done);
      
      TV.find({})
        .then((docs) => {
          assert.equal(docs.length, 3)
        })
        .then(() => done)
        .catch(e => done(e));
  });

  
  it('DELETE should delete one item', done => {
    request(app)
      .delete(`/product/tv/${items[1]._id}`)
      .set('Authorization', 'bearer ' + auth.token)
      .expect(200)
      .end(done);
  })
})