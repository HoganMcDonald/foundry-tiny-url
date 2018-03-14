const URL = require('../models/Url.model');
const Counter = require('../models/Counter.model');

module.exports = class Url {

  static new(req, res) {
    Counter.findOneAndUpdate({key: 'url'}, { $inc: { value: 1 }})
      .then(counter => {
        res.send({value: ++counter.value});
      })

  } // new()

} // Url
