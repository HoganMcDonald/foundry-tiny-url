const express = require('express');
const path = require('path');
const router = express.Router();
const passport = require ('passport');
const cel = require('connect-ensure-login');

// controllers
const User = require('../controllers/user.controller');
const Url = require('../controllers/url.controller');

router.route('/')
  .get( (req, res) => {
    res.sendFile(path.resolve('build/index.html'));
  });

router.route('/register')
  .post(User.register);

router.route('/login')
  .post(passport.authenticate('local'), User.login);

router.route('/user')
  .get(User.isLoggedIn, User.self);

router.route('/url')
  .post(User.isLoggedIn, Url.new)

// router.route('/:urlCode')
//   .get( (req, res) => {
//     res.send(req.params.urlCode);
//   })

module.exports = router;
