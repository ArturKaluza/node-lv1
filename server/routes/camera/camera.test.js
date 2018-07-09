const request = require('supertest');
const chai = require('chai');

const {app} = require('../../server');
const Camera = require('../../../db/models/Camera');

const {populateCameras, items} = require('../../../test/testEnv');

before(populateCameras);

describe('Camera', () => {
  it('GET should return all items', (done) => {
    request(app)
      .get('/product/camera')
      .expect(200)
      .expect(res => {
        expect(res.body.length).to.equal(2);
      })
      .end(done()) 
  });

  it('GET should return 404', (done) => {
    request(app)
      .get('/product/camera/5b43234ecf930b0e0ccf3416')
      .expect(404)
      .end(done())
  })

  it('POST should not create camera', (done) => {
    request(app)
      .post('/product/camera/new')
      .send({})
      .expect(400)
      .end(done())    
  })

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
      .expect(res => {
        expect(res.body.name).to.be.a('string')
      })
      .end(done())      
    });
});

