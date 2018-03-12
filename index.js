// environment variabels
require('dotenv').config();

// express app
const express = require('express');
const app = express();
const db = require('./server/db');

// make production files static
app.use(express.static('build'));

// compression middleware
app.use(require('compression')());

// display requests that returned errors in terminal
app.use(require('morgan')('combined', {
  skip: function (req, res) { return res.statusCode < 400 }
}));

// body-parser for handling json request objects
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// session setup for authentication
app.use(require('cookie-parser')());
app.use(require('express-session')({
  secret: process.env.SESSION_SECRET || 'foundry',
  resave: true,
  saveUninitialized: false
}));

// use passport middleware

// load routes
app.use('/', require('./server/routes'));

// start server
const server = app.listen(process.env.PORT || 5000, () =>
  console.log(`   Server listening on port ${server.address().port}`));

module.exports = server;
