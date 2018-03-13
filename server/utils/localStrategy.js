var passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User.model');

passport.use('local', new LocalStrategy({
  passReqToCallback: true,
  usernameField: 'email',
  passwordField: 'password'
}, function ( req, email, attemptedPassword, done ) {
  // find user document
  User.findOne({ email: email }, function ( err, foundUser ) {
    if (!foundUser) {
      done( null, false, {message:'Incorrect credentials.'} );
    }
    else {
      foundUser.comparePassword( attemptedPassword, function( isMatch ) {
        if( isMatch ) {
          done( null, foundUser, {message: 'Successful Login'} );
        } else {
          done( null, false, {message:'Incorrect credentials.'});
        }
      });
    }
  });

  passport.serializeUser( function( user, done ) {
    done( null, user.id );
  });

  passport.deserializeUser( function( id, done ) {
    User.find({_id: id}, function( err, foundUser ) {
      done( null, foundUser );
    });
  });

}));

module.exports = passport;
