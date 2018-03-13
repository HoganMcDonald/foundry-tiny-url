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

  static login(req, res, next) {
    if (req.isAuthenticated()) {
      res.status(200).send({
        email: req.user.email,
        id: req.user.id
      })
    } else {
      res.status(500).send('something went wrong');
    }
  } // login()

  static self(req, res) {
    res.send({
      email: req.user.email
    })
  } // self()

  static authenticate(req, res, next) {
    if (req.isAuthenticated()) {
      next()
    } else {
      res.sendStatus(401);
    }
  } // authenticate()

}
