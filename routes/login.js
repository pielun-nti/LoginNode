const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { query } = require('../models/db');

/* GET login form */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;