'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const jwt = require('jsonwebtoken');

const {dbConnect, dbDisconnect} = require('../db-mongoose');
const { User } = require('../models/user');
const { JWT_SECRET, TEST_DATABASE_URL } = require('../config');
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
  // // console.log('hello');

  // before(function () {
  //   // return runServer(TEST_DATABASE_URL);
  //   return dbConnect(TEST_DATABASE_URL);    
  // });

  // after(function () {
  //   // return closeServer();
  //   return dbDisconnect();  
  // });

  // beforeEach(function () {
  //   console.log(password);
  //   return User.hashPassword(password).then(password =>
  //     User.create({
  //       fullname,
  //       username,
  //       password,
  //       email
  //     })
  //   );
  // });

  // afterEach(function () {
  //   return User.remove({});
  // });

  // describe('/api', function () {
  //   it('Should reject requests with no credentials', function () {
  //     return chai
  //       // .request(app)
  //       // .post('/api/auth/login')
  //       // .then(() =>
  //       //   expect.fail(null, null, 'Request should not succeed')
  //       // )
  //       // .catch(err => {
  //       //   if (err instanceof chai.AssertionError) {
  //       //     throw err;
  //       //   }

  //       //   const res = err.response;
  //       //   expect(res).to.have.status(400);
  //       // });
  //   });
  // })
});