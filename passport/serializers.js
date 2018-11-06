const passport = require('passport');
const User = require('../models/User');

passport.serializeUser((loggedInUser, cb) => {
  cb(null, loggedInUser._id);
});

// This part has access of the session from the cookie and finds the connected user
// It defines a req.user if the user is connected
passport.deserializeUser((userIdFromSession, cb) => {
  User.findById(userIdFromSession)
  .then(userDocument => {
    cb(null, userDocument);
  })
  .catch(err => {
    cb(err);
  })
});
