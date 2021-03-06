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

router.route('/logout')
  .get((req, res) => {
    req.logout();
    req.session.destroy();
    res.redirect('/');
  })

router.route('/user')
  .get(User.isLoggedIn, User.self);

router.route('/url')
  .get(User.isLoggedIn, Url.all)
  .post(User.isLoggedIn, Url.verify, Url.new)

router.route('/url/:id')
  .delete(User.isLoggedIn, Url.remove);

router.route('/:urlCode') // 8 diget alpha-numeric including - and _
  .get(Url.redirect);

module.exports = router;
