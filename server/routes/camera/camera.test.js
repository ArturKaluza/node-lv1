const request = require('supertest');
const chai = require('chai');

const app = require('../../server');

//const {Camera} = require('../../db/models/Camera');

describe('Camera', () => {
  it('GET should return all items', (done) => {
    request(app)
      .get('/product/camera')
      .expect(200)
      .expect(res => {
        chai.expect(res.length).to.equal(20);
      })
      .end(done()) 
  });

  it('POST should create new camera', (done) => {
    const item = {
      name: 'test item',
      desc: 'test item',
      price: 10,
      amount: 20
    }

    request(app)
      .post('/product/camera/new')
      .send(item)
      .expect(201)
      .expect( res => {
        chai.expect(res.name).to.be('string')
        chai.expect(res.price).to.equal(20);
      })
      .end(done());
  });
});

