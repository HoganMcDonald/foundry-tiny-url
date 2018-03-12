const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/foundryTinyUrl');

// connect to db
const db = mongoose.connection;
db.on('error', (err)=>
  console.error.bind(console, 'connection error:', err));
db.once('open', ()=> {
  console.log('   mongodb connection is open')
});

module.exports = db;
