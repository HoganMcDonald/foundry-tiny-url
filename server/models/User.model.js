const mongoose = require ('mongoose');
const bcrypt = require ('bcrypt');
const Schema = mongoose.Schema;

// validates if a string is an email. -- http://emailregex.com/
let validateEmail = (email) =>
  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate: {
      validator: validateEmail,
      message: '{VALUE} is not a valid email!'
    }
  },
  password: {
    type: String,
    required: true,
    unique: false
  }
});

userSchema.pre('save', function(next) {
  let user = this;
  if(!user.isModified('password')) {
    return next();
  }
  bcrypt.genSalt(process.env.SALT_FACTOR || 10, ( err, salt ) => {
    bcrypt.hash(user.password, salt, ( err, hash ) => {
      user.password = hash;
      next();
    });
  });
});

userSchema.pre('update', function(next) {
  let query = this;
  if(!query._update.$set.hasOwnProperty('password')) {
    return next();
  }
  let newPassword = query._update.$set.password;
  bcrypt.genSalt(process.env.SALT_FACTOR || 10, ( err, salt ) => {
    bcrypt.hash(newPassword, salt, ( err, hash ) => {
      query.update({}, { $set: { password: hash } });
      next();
    });
  });
});

userSchema.methods.comparePassword = function( attemptedPassword, callback ) {
  bcrypt.compare( attemptedPassword, this.password, (err, isMatch) => {
    callback(isMatch);
  });
};

const users = mongoose.model('users', userSchema);
module.exports = users;
