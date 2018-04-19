'use strict';

const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser').json();

const User = require('../models/user');
const Question = require('../models/question');

/* ========== GET/READ ALL ITEM ========== */
router.get('/users', bodyParser, (req, res, next) => {
  User.find()
    .then(results => {
      res.json(results);
    })
    .catch(err => {
      next(err);
    });
});

/* ========== GET/READ AN ITEM BY ID ========== */
router.get('/users/:id', bodyParser, (req, res, next) => {
  const {id} = req.params;
  User.findById({_id: id})
    .select('questions correct incorrect')
    .then(results => {
      res.json(results);
    })
    .catch(err => {
      next(err);
    });
});

/* ========== POST/CREATE AN ITEM ========== */
router.post('/users', bodyParser, (req, res, next) => {
  const {fullname, username, password, email, correct, incorrect} = req.body;

  const requiredFields = ['username', 'password', 'email', 'fullname'];
  const hasFields = requiredFields.every(field => {
    return req.body[field];
  });
  
  const stringFields = ['username', 'password', 'fullname', 'email'];
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

  const fieldSize = {
    username: {
      min: 1
    },
    password: {
      min: 8,
      max: 72
    }
  };

  const tooSmallField = Object.keys(fieldSize).find(field => {
    if ('min' in fieldSize[field] && 
       req.body[field].length < fieldSize[field].min) {
      return true;
    }
  });

  const tooLargeField = Object.keys(fieldSize).find(field => {
    if ('max' in fieldSize[field] &&
      req.body[field].length > fieldSize[field].max) {
      return true;
    }
  });

  if (tooSmallField) {
    return res.status(422).json({
      code: 422,
      reason: 'ValidationError',
      message: 'Username needs to be at least 1 character long and Password needs to be at least 8 characters long',
      location: 'tooSmallField'
    });
  }

  if (tooLargeField) {
    return res.status(422).json({
      code: 422,
      reason: 'ValidationError',
      message: 'Password needs to be at most 72 characters long',
      location: 'tooLargeField'
    });
  }

  let questions = [
    {
      'spanish': 'gato',
      'english': 'cat',
      'id': '5ad61ceb1aad04bea1adb4b5',
      'mValue': 1,
      'nextQuestion': '5ad61ceb1aad04bea1adb4b6',
      'head': true
    },
    {
      'spanish': 'perro',
      'english': 'dog',
      'id': '5ad61ceb1aad04bea1adb4b6',
      'mValue': 1,
      'nextQuestion': '5ad61ceb1aad04bea1adb4b7',
      'head': false
    },
    {
      'spanish': 'tortuga',
      'english': 'turtle',
      'id': '5ad61ceb1aad04bea1adb4b7',
      'mValue': 1,
      'nextQuestion': '5ad61ceb1aad04bea1adb4b8',
      'head': false
    },
    {
      'spanish': 'raton',
      'english': 'mouse',
      'id': '5ad61ceb1aad04bea1adb4b8',
      'mValue': 1,
      'nextQuestion': '5ad61ceb1aad04bea1adb4b9',
      'head': false
    },
    {
      'spanish': 'cerdo',
      'english': 'pig',
      'id': '5ad61ceb1aad04bea1adb4b9',
      'mValue': 1,
      'nextQuestion': '5ad61ceb1aad04bea1adb4ba',
      'head': false
    },
    {
      'spanish': 'pajaro',
      'english': 'bird',
      'id': '5ad61ceb1aad04bea1adb4ba',
      'mValue': 1,
      'nextQuestion': 'nothing',
      'head': false
    }
  ];

  return User.hashPassword(password)
    .then(digest => {
      const newUser = {
        username,
        password: digest,
        fullname,
        email,
        correct,
        incorrect,
        questions,
      };
      return User.create(newUser);
    })
    .then(result => {
      return res.location(`${req.originalUrl}/${result.id}`).status(201).json(result);
    })
    .catch(err => {
      if (err.code === 11000) {
        err = new Error('The username already exists');
      }
      next(err);
    });
});

/* ========== UPDATE AN ITEM ========== */
router.put('/users/:id', bodyParser, (req, res, next) => {
  const {id} = req.params;
  const {english, result} = req.body;

  let updateItem;
  User.findById({_id: id})
    .then(results => {
      if (result === 1) {
        results.correct++;
      } else {
        results.incorrect++;
      }
      let questions = results.questions;
      let currNode;
      let nextQuestionID;
      console.log(currNode.nextQuestion);
      for (let i = 0; i < questions.length; i++) {
        if (questions[i].head) {
          currNode = questions[i];
          currNode.head = false;
          nextQuestionID = currNode.nextQuestion;
        }
      }
      for (let i = 0; i < questions.length; i++) {
        if (questions[i].id === nextQuestionID) {
          questions[i].head = true;
        }
      }
      let nextNode = currNode;
      if (english === currNode.english) {
        currNode.mValue *= 2;
        if (currNode.mValue > questions.length) {
          currNode.mValue = questions.length - 1;
        }
        for (let i = 0; i < currNode.mValue; i++) {
          nextNode = nextNode.nextQuestion;
          for (let j = 0; j < questions.length; j++) {
            if (questions[j].id === nextNode) {
              nextNode = questions[j];
            }
          }
        }
        currNode.nextQuestion = nextNode.nextQuestion;
        nextNode.nextQuestion = currNode.id;
        updateItem = questions;
      } else {
        currNode.mValue = 1;
        for (let i = 0; i < currNode.mValue; i++) {
          nextNode = nextNode.nextQuestion;
          for (let j = 0; j < questions.length; j++) {
            if (questions[j].id === nextNode) {
              nextNode = questions[j];
            }
          }
        }
        currNode.nextQuestion = nextNode.nextQuestion;
        nextNode.nextQuestion = currNode.id;
        updateItem = questions;
      }
      return results;
    })
    .then(results => {
      User.findByIdAndUpdate({_id: id}, {
        questions: updateItem,
        fullname: results.fullname,
        username: results.username,
        email: results.email,
        id: results.id,
        correct: results.correct,
        incorrect: results.incorrect
      })
        .then(result => {
          res.json(result);
        });
    })
    .catch(next);
});

module.exports = router;