
const express = require('express');
const router = express.Router();
const {wrapAsync} = require('../Utils/middleware');
const passport = require('passport');
const {registerNewUser, login, logout, isUserAuthenticate} = require('../Controller/user');


router.post('/signup', registerNewUser);

router.post('/login',
  passport.authenticate('local', {failureRedirect : "/login"}),
  login
);

router.post('/logout', logout);

router.get('/api/auth/check', isUserAuthenticate);

module.exports = router;