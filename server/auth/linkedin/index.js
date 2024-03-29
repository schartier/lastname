'use strict';

var express = require('express');
var passport = require('passport');
var auth = require('../auth.service');

var router = express.Router();

router
  .get('/', passport.authenticate('linkedin', {
    failureRedirect: '/signup',
    state: 'blabla',
    session: false,
    scope: ['r_emailaddress', 'r_basicprofile', 'r_fullprofile', 'r_contactinfo', 'r_network', 'rw_company_admin', 'rw_nus', 'rw_groups', 'w_messages']
  }))

  .get('/callback', passport.authenticate('linkedin', {
    failureRedirect: '/signup',
    session: false
  }), auth.setTokenCookie);

module.exports = router;