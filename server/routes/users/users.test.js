const {app} = require('../../server');
const request = require('supertest');
const assert = require('chai').assert;

const Users = require('../../../db/models/Users');
const {auth, user, getUserId} = require('../../../test/testEnv');

before(getUserId(user));

describe('Users', () => {
  it('should delete user', done => {
      request(app)
        .delete(`/users/${user.id}`)
        .set('Authorization', 'bearer ' + auth.token)
        .expect(200)
        .end(done);
  })

  it('should create user', done => {
    const user = {
      name: 'Nowy',
      password1: 'test123',
      password2: 'test123'
    }

    request(app)
      .post('/users/create')
      .send(user)
        .expect(201)
        .expect(res => {
          assert.equal(res.body.name, 'Nowy');
          assert.notEqual(res.body.password, user.password1);
        })
        .end(done);
  })

  it('should not create user with diffrent passwords', done => {
    const user = {
      name: 'Nowy2',
      password1: 'test',
      password2: 'test123'
    }
    
    request(app)
          .post('/users/create')
          .send(user)
          .expect(400)
          .expect(res => {
            assert.equal(res.body.error, 'diffrent password')
          })
          .end(done);
  });

  it('should not create users when already exist', done => {
    const user = {
      name: 'Nowy',
      password1: 'test1234',
      password2: 'test1234'
    }
    
    request(app)
          .post('/users/create')
          .send(user)
          .expect(400)
          .expect(res => {
            assert.equal(res.body.msg, 'User already exist')
          })
          .end(done);
  });
})

