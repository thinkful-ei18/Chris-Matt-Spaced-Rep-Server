'use strict';

const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
  spanish: {
    type: String,
    required: true
  },
  english: {
    type: String,
    required: true
  },
  mValue: {
    type: Number,
    default: 0
  },
  nextQuestion: {
    type: String,
  },
  head: {
    type: Boolean
  }
});

QuestionSchema.set('toObject', {
  transform: function (doc, ret) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  } 
});

const Question = mongoose.model('Question', QuestionSchema);

module.exports = Question;