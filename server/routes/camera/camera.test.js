const {app} = require('../../server');
const request = require('supertest')(app);
const chai = require('chai');


const Camera = require('../../../db/models/Camera');

const {populateCameras, items, itemsOneId, itemsTwoId} = require('../../../test/testEnv');

//before(populateCameras);
//beforeEach(() => console.log('DB preper'))

describe('Camera', () => {
//   it('POST should create new camera', (done) => {
//     const item = {
//       name: 'test item',
//       desc: 'test item',
//       price: 10,
//       amount: 20

    
    
// //     }



  it('GET should return all items', (done) => {
    request
      .get('/product/camera')
      .expect(200)
      .expect(res => {
        console.log(res);
        chai.assert(res.body.length).to.equal(100);
      })
      .end(done()) 
  });

  
  it('GET should return 404', (done) => {
    request
      .get(`/product/camera/5b4c8ad2dd899a05383c4521`)
      .expect(404)
      .end(done())
  })

  it('GET should return one item', done => {
    const id = items[0]._id.toHexString().trim();
    
    request
      .get(`/product/camera/${id}`)
      .expect(200)
      .expect(res => {
        console.log(res)
        chai.expect(res.body).to.be('object');
        chai.expect(res.body).to.be('string');
      })
      .end(done());
  })
})

  // it('GET should return one item', (done) => {
  //   request
  //     .get('/product/camera/2')
  //     .expect(200)     
  //     .end(done())
  // })

  // it('POST should not create camera', (done) => {
  //   request
  //     .post('/product/camera/new')
  //     .send({})
  //     .expect(400)
  //     .end(done())    
  // })

  // it('POST should create new camera', (done) => {
  //   const item = {
  //     name: 'test item',
  //     desc: 'test item',
  //     price: 10,
  //     amount: 20
  //   }

  //   request
  //     .post('/product/camera/new')
  //     .send(item)
  //     .expect(201)
  //     .expect(res => {
  //       expect(res.body.name).to.be.a('string')
  //     })
  //     .end(done())      
  //   });
// });

