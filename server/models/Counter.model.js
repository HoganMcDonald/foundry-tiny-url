const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const counterSchema = new Schema({
  key: {
    type: String,
    required: true,
    unique: true
  },
  value: {
    type: Number,
    required: true,
    unique: false,
    default: 0
  }
});

const counter = mongoose.model('counter', counterSchema);
module.exports = counter;
