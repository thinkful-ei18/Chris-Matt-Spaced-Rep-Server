'use strict';

const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser').json();

const Question = require('../models/question');

const _Node = require('../linked-list/node');
const LinkedList = require('../linked-list/linked-list');

/* ========== GENERATE TEST DATA FOR LINKED-LIST ========== */
function seedData() {
  let SLL = new LinkedList;
  SLL.insertLast('gato', 'cat');
  SLL.insertLast('perro', 'dog');
  SLL.insertLast('caballo', 'horse');
  SLL.insertLast('raton', 'mouse');
  SLL.insertLast('cerdo', 'pig');
  
  SLL.insertLast('pajaro', 'bird');
  SLL.insertLast('ballena', 'whale');
  SLL.insertLast('cabra', 'goat');
  SLL.insertLast('elefante', 'elephant');
  SLL.insertLast('yo quiero Taco Bell', 'I want Taco Bell');
  
  

  console.log(JSON.stringify(SLL));
}
seedData();

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
  };

  return Question.create(newQuestion)
    .then(result => {
      return res.location(`${req.originalUrl}/${result.id}`).status(201).json(result);
    })
    .catch(err => {
      if (err.code === 11000) {
        err = new Error('The spanish word already exists');
      }
      next(err);
    });
});

/* ========== UPDATE A QUESTION ========== */
router.put('/questions/:id', bodyParser, (req, res, next) => {
  const { id } = req.params;
  const { spanish, english, nextQuestion, head, m } = req.body;

  const updateItem = { spanish, english, nextQuestion, head, m };

  Question.findByIdAndUpdate(id, updateItem)
    .then(result => {
      if (result) {
        res.json(result);
      } else {
        next();
      }
    })
    .catch(next);
});

module.exports = router;