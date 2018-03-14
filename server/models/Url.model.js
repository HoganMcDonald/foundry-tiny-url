const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

// generates 7 character unique alphanumeric string. 3.5e12 permutations
const shortId = require('shortid');

const urlSchema = new Schema({
  endpoint: {
    type: String,
    unique: true,
    default: shortId.generate
  },
  user_id: {
    type: String,
    required: true,
    unique: false
  },
  redirect: {
    type: String,
    required: true,
    unique: false
  },
  visits: {
    type: Number,
    default: 0
  }
});

const url = mongoose.model('urls', urlSchema);
module.exports = url;
