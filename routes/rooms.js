const express = require('express');
const Room = require('../models/Room')
const router  = express.Router();

function ensureAuthenticated(req, res, next) {
  if (req.user) {
    return next();
  } else {
    res.redirect('/auth/login')
  }
}

router.get('/add-room', ensureAuthenticated, (req, res, next) => {
  res.render('add-room');
});

router.post('/add-room', ensureAuthenticated, (req, res, next) => {
  Room.create({
    description: req.body.description, // The description from the form
    imageUrl: req.body.imageUrl,
    address: req.body.address,
    _owner: req.user._id, // the _id from the connected user 
  })
  .then(room => {
    res.redirect('/my-rooms')
  })
});

router.get('/my-rooms', ensureAuthenticated, (req, res, next) => { 
  // Find all the rooms where the _owner is the connected user
  Room.find({ _owner: req.user._id })
  .then(rooms => {
    res.render('rooms', {rooms});
  })
});

function checkRole(role) {
  return (req,res,next) => {
    if(req.user && req.user.role === role) {
      next()
    }
    else {
      res.redirect('/')
    }
  }
}

// checkRole('ADMIN') check if the user has the role 'ADMIN'
// if yes, goes to the next middleware
// if no, redirects to '/'
router.get('/rooms', checkRole('ADMIN'), (req, res, next) => { 
  Room.find()
  .then(rooms => {
    res.render('rooms', {rooms});
  })
})

module.exports = router;
