const URL = require('../models/Url.model');

module.exports = class Url {

  static new(req, res) {
    let newUrl = new URL({
      user_id: req.user[0]._id,
      redirect: req.body.redirect
    })
    newUrl.save(err => {
      if (err) {
        res.status(400).send({message: err});
      } else {
        res.status(201).send(newUrl);
      }
    })
  } // new()

  static redirect(req, res) {
    let urlCode = req.params.urlCode;
    URL.findOneAndUpdate({
      endpoint: urlCode
    },
    {
      $inc: {visits: 1}
    })
    .then((url) => {
      res.redirect(url.redirect);
    });
  } // redirect()

} // Url
