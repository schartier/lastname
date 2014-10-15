'use strict';

var express = require('express');
var controller = require('./user.controller');
var config = require('../../config/environment');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/', auth.hasRole('admin'), controller.index);
router.post('/', controller.create);

router.get('/me', auth.isAuthenticated(), controller.me);

router.get('/profile/:name', controller.profile);

router.delete('/:id', auth.hasRole('admin'), controller.destroy);
router.get('/:id', auth.isAuthenticated(), controller.show);

router.put('/:id/password', auth.isAuthenticated(), controller.changePassword);

module.exports = router;
