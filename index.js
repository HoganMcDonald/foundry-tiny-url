// environment variabels
require('dotenv').config();

// dependencies
const express = require('express');

const app = express();
const db = require('./server/db');

// start server
const server = app.listen(process.env.PORT || 5000, () =>
  console.log(`   Server listening on port ${server.address().port}`));

// export server for testing
module.exports = server;
