const User = require('../models/User.model');

module.exports = class UserController {

  static register(req, res) {
    let newUser = new User({
      email: req.body.email,
      password: req.body.password
    })
    newUser.save( err => {
      if (err) {
        res.status(400).send(err);
      } else {
        req.login(newUser, (err) => {
          res.status(201).send();
        });
      }
    })
  } // register()

  static login(req, res) {
    console.log(req.isAuthenticated())
    res.status(200).send({
      email: req.user.email,
      id: req.user.id
    })
  } // login()

  static self(req, res) {
    if (req.isAuthenticated()) {
      res.status(200).send({
        email: req.user.email,
        id: req.user.id
      })
    } else {
      res.status(401).send({error: 'not logged in'});
    }
  } // self()

  static authenticate(req, res, next) {
    console.log('req.user', req.user)
    if (req.isAuthenticated()) {
      next()
    } else {
      res.status(401).send({error: 'you\'re not logged in'});
    }
  } // authenticate()

}
