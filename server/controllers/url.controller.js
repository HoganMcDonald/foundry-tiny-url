const path = require('path');
const request = require('request');
const URL = require('../models/Url.model');

module.exports = class Url {

  /*
        will verify that a
          url is valid
  */
  static verify(req, res, next) {
    request(req.body.redirect, (err, response, body) => {
      if (err || (response.statusCode >= 400 && response.statusCode < 500)) {
        res.status(400).send(`${req.body.redirect} is not a vaild url`);
      } else {
        next();
      }
    })
  }

  /*
        POST: create a new url
  */
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

  /*
        GET: find a url in db and
          redirect
  */
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
    })
    .catch(err => res.sendFile(path.resolve('client/build/notFound.html')));
  } // redirect()

  /*
        GET: retrieve all url documents
          for an authenticated user
  */
  static all(req, res) {
    console.log('11111')
    URL.find({user_id: req.user[0]._id})
      .then(urls => {
        console.log('22222222')
        res.send({urls: urls});
      })
      .catch(err => {
        console.log('3333333333')
        res.status(400).send({message: 'unable to retrieve records'});
      });
  } // all()

  /*
        DELETE: deletes a url specified
          by id in params
  */
  static remove(req, res) {
    const urlId = req.params.id;
    URL.remove({_id: urlId})
      .then(url => {
        res.status(200).send('deleted');
      })
      .catch(err => {
        res.status(400).send({message: 'document not found'});
      });
  }

} // Url
