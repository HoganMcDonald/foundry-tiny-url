// dependencies
const bodyParser = require('body-parser');
const compression = require('compression');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const express = require('express');
const morgan = require('morgan');
const session = require('express-session');
const passport = require('./server/utils/localStrategy');

// load environment variabels
dotenv.config();

// express app
const app = express();

// make production files static
app.use(express.static('client/build'));

// compression middleware
app.use(compression());

// display requests that returned errors in terminal
app.use(morgan('combined', {
  skip: function (req, res) { return res.statusCode < 400 }
}));

// body-parser for handling json request objects
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// session setup for authentication
app.use(session({
  secret: process.env.SESSION_SECRET || 'foundry',
  key: 'user',
  resave: false,
  saveUninitialized: false,
  cookie: { maxage: 43200000, secure: false }
}));

// use passport middleware
app.use(passport.initialize());
app.use(passport.session());

// load routes
app.use('/', require('./server/routes'));

// start server
const db = require('./server/db');
const server = app.listen(process.env.PORT || 5000, () =>
  console.log(`   Server listening on port ${server.address().port}`));

// module.exports = server;
