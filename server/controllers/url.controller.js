const URL = require('../models/Url.model');
const Counter = require('../models/Counter.model');

module.exports = class Url {

  static new(req, res) {
    const self = this;
    Counter.findOneAndUpdate({key: 'url'}, { $inc: { value: 1 }})

      .then(urlCounter => ++urlCounter.value)

      .then((index) => {

        let endpoint = String(index);

        console.log(endpoint);

        while (endpoint.length < 6) {
          endpoint = '0' + endpoint;
        }

        console.log(endpoint);

        endpoint = parseInt(endpoint, 36);
        
        console.log(endpoint);


        res.send({value: index})
      })



  } // new()

  static _genEndpoint(index) {
    // convert index to String of length 6 with radix 36
    let endpoint = String(index);
    console.log(endpoint);
    return endpoint;
  } // _genEndpoint()

} // Url
