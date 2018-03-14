const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const Counter = require('./Counter.model');

// check if url counter exists. creates one if it doesn't
Counter.find({key: 'url'})
  .then((urlCounter) => {
    if (!urlCounter) {
      Counter.create({key: 'url'})
    }
  });

const urlSchema = new Schema({
  endpoint: {
    type: String,
    required: false,
    unique: true
  },
  user_id: {
    type: String,
    required: true,
    unique: false
  },
  redirect: {
    type: String,
    required: false,
    unique: false
  },
  visits: {
    type: Number,
    required: false,
    unique: false,
    default: 0
  },
  counter: {
    type: Number,
    required: true,
    unique: true
  }
});

const url = mongoose.model('urls', urlSchema);
module.exports = url;
