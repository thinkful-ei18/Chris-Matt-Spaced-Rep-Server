'use strict';

const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser').json();

const passport = require('passport');
const jwt = require('jsonwebtoken');
const {JWT_SECRET, JWT_EXPIRY} = require('../config');

const options = {session: false, failWithError: true};

const localAuth = passport.authenticate('local', options);

function createAuthToken(user) {
  return jwt.sign({user}, JWT_SECRET, {
    subject: user.username,
    expiresIn: JWT_EXPIRY
  });
}

router.post('/auth/login', bodyParser, localAuth, (req, res) => {
  const authToken = createAuthToken(req.user);
  return res.json({authToken});
});

const jwtAuth = passport.authenticate('jwt', options);

router.post('/auth/refresh', jwtAuth, (req, res) => {
  const authToken = createAuthToken(req.user);
  res.json({authToken});
});

module.exports = router;