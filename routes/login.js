const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const authcontroller = require('../controllers/AuthController');
const { query } = require('../models/db');
const { body, validationResult } = require('express-validator');

/* GET login form */
router.get('/', function(req, res, next) {
  res.render('login');
});

/* GET skapa en hash som vi kan spara i db */
router.get('/kryptan/:pwd', function(req, res, next) {

  const myPlaintextPassword = req.params.pwd;

  bcrypt.hash(myPlaintextPassword, 10, function(err, hash) {
    // Store hash in your password DB.
    res.json({
      pwd: hash
    });
  });
});

/* POST login */
router.post('/', 
  body('username').notEmpty().trim(),
  body('password').notEmpty(),
  authcontroller.store);

router.delete('/', authcontroller.destroy);

module.exports = router;

/*
"value": "",
"msg": "Invalid value",
"param": "username",
"location": "body"
*/