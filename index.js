// dependencies
const bodyParser = require('body-parser');
const compression = require('compression');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const express = require('express');
const morgan = require('morgan');
const session = require('express-session');

// load environment variabels
dotenv.config();

// express app
const app = express();
const db = require('./server/db');

// make production files static
app.use(express.static('build'));

// compression middleware
app.use(compression());

// display requests that returned errors in terminal
app.use(morgan('combined', {
  skip: function (req, res) { return res.statusCode < 400 }
}));

// body-parser for handling json request objects
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// session setup for authentication
app.use(cookieParser());
app.use(session({
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
