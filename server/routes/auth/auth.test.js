const {app} = require('../../server');
const request = require('supertest');
const assert = require('chai').assert;

const { checkUser } = require('../../../test/testEnv');

describe('Auth', () => {
  it('should return token', done => {
    request(app)
          .post('/auth/login')
          .send({
              name: 'Test',
              password: 'test123'
          })
          .expect(200)
          .expect(res => {
            assert.exists(res.body.token)
          })
          .end(done)
  });

  it('should not return token(404)', done => {
    request(app)
          .post('/auth/login')
          .send({
              name: 'try',
              password: 'test123'
          })
          .expect(404)
          .expect(res => {
            assert.notExists(res.body.token);
            assert.exists(res.body.message)
          })
          .end(done)
  });
});