'use strict';

require('dotenv').config();
// global.TEST_DATABASE_URL = 'mongodb://localhost/jwt-auth-demo-test';
const { User } = require('../models/user');
const { JWT_SECRET, TEST_DATABASE_URL } = require('../config');

const chai = require('chai');
const chaiHttp = require('chai-http');
const jwt = require('jsonwebtoken');

const {dbConnect, dbDisconnect} = require('../db-mongoose');
const { app } = require('../index');

const expect = chai.expect;

// This let's us make HTTP requests
// in our tests.
// see: https://github.com/chaijs/chai-http

chai.use(chaiHttp);

describe('Auth endpoints', function () {
  const fullname = 'exampleFullName';
  const username = 'exampleUser';
  const password = 'examplePass';
  const email = 'example@something.com';

  const usernameB = 'exampleUserB';
  const passwordB = 'examplePassB';
  const fullnameB = 'exampleFullNameB';
  const emailB = 'example@something.comB';
  
  // // console.log('hello');

  before(function () {
    // return runServer(TEST_DATABASE_URL);
    return dbConnect(TEST_DATABASE_URL);    
  });

  after(function () {
    // return closeServer();
    return dbDisconnect();  
  });

  beforeEach(function () {
    return User.hashPassword(password).then(password =>
      User.create({
        fullname,
        username,
        password,
        email
      })
    );
  });

  afterEach(function () {
    return User.remove({});
  });

  describe('/api/users', function() {
    describe('POST', function() {
      it('Should reject users with missing username', function() {
        return chai
          .request(app)
          .post('/api/users')
          .send({
            password,
          })
          .then(() =>
            expect.fail(null, null, 'Request should not succeed')
          )
          .catch(err => {
            if (err instanceof chai.AssertionError) {
              throw err;
            }

            const res = err.response;
            expect(res).to.have.status(422);
            expect(res.body.reason).to.equal('ValidationError');
            expect(res.body.message).to.equal('Missing field');
          });
      });

      it('Should reject users with missing password', function() {
        return chai
          .request(app)
          .post('/api/users')
          .send({
            username,
          })
          .then(() =>
            expect.fail(null, null, 'Request should not succeed')
          )
          .catch(err => {
            if (err instanceof chai.AssertionError) {
              throw err;
            }

            const res = err.response;
            expect(res).to.have.status(422);
            expect(res.body.reason).to.equal('ValidationError');
            expect(res.body.message).to.equal('Missing field');
          });
      });

      it('Should reject users with non-string username', function() {
        return chai
          .request(app)
          .post('/api/users')
          .send({
            username: 1234,
          })
          .then(() =>
            expect.fail(null, null, 'Request should not succeed')
          )
          .catch(err => {
            if (err instanceof chai.AssertionError) {
              throw err;
            }

            const res = err.response;
            expect(res).to.have.status(422);
            expect(res.body.reason).to.equal('ValidationError');
          });
      });

      it('Should reject users with non-string password', function() {
        return chai
          .request(app)
          .post('/api/users')
          .send({
            username,
            password: 1234,
          })
          .then(() =>
            expect.fail(null, null, 'Request should not succeed')
          )
          .catch(err => {
            if (err instanceof chai.AssertionError) {
              throw err;
            }

            const res = err.response;
            expect(res).to.have.status(422);
            expect(res.body.reason).to.equal('ValidationError');
          });
      });

      it('Should reject users with empty username', function() {
        return chai
          .request(app)
          .post('/api/users')
          .send({
            username: '',
            password
          })
          .then(() =>
            expect.fail(null, null, 'Request should not succeed')
          )
          .catch(err => {
            if (err instanceof chai.AssertionError) {
              throw err;
            }

            const res = err.response;
            expect(res).to.have.status(422);
            expect(res.body.reason).to.equal('ValidationError');
          });
      });
    });

  });

});