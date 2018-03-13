const express = require('express');
const path = require('path');
const router = express.Router();
const passport = require ('passport');

// controllers
const User = require('../controllers/user.controller');

router.route('/')
  .get( (req, res) => {
    res.sendFile(path.resolve('build/index.html'));
  });

router.route('/register')
  .post(User.register);

router.route('/login')
  .post(passport.authenticate('local'), User.login);

router.route('/user')
  .get(User.authenticate, User.self);

router.route('/:urlCode')
  .get( (req, res) => {
    res.send(req.params.urlCode);
  })

module.exports = router;
