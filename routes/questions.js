'use strict';

const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser').json();

const Question = require('../models/question');

/* ========== GET/READ ALL QUESTIONS ========== */
router.get('/questions', (req, res, next) => {
  Question.find()
    .then(results => {
      // console.log('RESULTS:', results[0])
      res.json(results);
    })
    .catch(err => {
      next(err);
    });
});

// /* ========== GET/READ ONE QUESTION ========== */
// router.get('/questions', (req, res, next) => {
//   Question.findOne()
//     .then(results => {
//       // console.log('TEST')
//       res.json(results);
//     })
//     .catch(err => {
//       next(err);
//     });
// });

/* ========== POST A QUESTION ========== */
router.post('/questions', bodyParser, (req, res, next) => {
  const {spanish, english} = req.body;
  console.log(spanish, english);

  const requiredFields = ['spanish', 'english'];
  const hasFields = requiredFields.every(field => {
    return req.body[field];
  });

  const stringFields = ['spanish', 'english'];
  const stringField = stringFields.every(field => {
    return field in req.body && typeof req.body[field] === 'string';
  });

  if (!hasFields) {
    return res.status(422).json({
      code: 422,
      reason: 'ValidationError',
      message: 'Missing field',
      location: 'hasFields'
    });
  }

  if (!stringField) {
    return res.status(422).json({
      code: 422,
      reason: 'ValidationError',
      message: 'Incorrect field type: expected string',
      location: 'stringField'
    });
  }

  const trimmedField = requiredFields.every(field => {
    return req.body[field].trim() === req.body[field];
  });

  if (!trimmedField) {
    return res.status(422).json({
      code: 422,
      reason: 'ValidationError',
      message: 'Field cannot start or end with whitespace',
      location: 'trimmedField'
    });
  }

  const newQuestion = {
    spanish,
    english
  }

  return Question.create(newQuestion)
  .then(result => {
    return res.location(`${req.originalUrl}/${result.id}`).status(201).json(result);
  })
  .catch(err => {
    if (err.code === 11000) {
      err = new Error('The spanish word already exists')
    }
    next(err);
  });
});

module.exports = router;