const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { query } = require('../models/db');

/* GET login form */
router.get('/', function(req, res, next) {
  // res.send('respond with a resource');
  res.render('login', {title: 'Login'});
});

/* GET skapa en hash */
router.get('/kryptan/:pwd', function(req, res, next) {

  const myPlaintextPassword = req.params.pwd;

  bcrypt.hash(myPlaintextPassword, 10, function(err, hash) {
    res.json({
      pwd: hash
    });
  });


});

/* POST login */
router.post('/', async function(req, res, next) {

  const username = req.body.username;
  const password = req.body.password;

  if (username && password) {
    try {
      const sql = 'SELECT password FROM users WHERE name = ?';
      const result = await query(sql, username);

      if(result.length > 0) {
        bcrypt.compare(password, result[0].password, function(err, result) {
          if (result == true) {
            req.session.loggedin = true;
            req.session.username = username;
            res.redirect('/secret');
          } else {
            res.render('login',{ error: 'Wrong username or password!'});
          }
        });
      } else {
        res.render('login',{ error: 'Wrong username or password!'});
      }
    } catch (e) {
      next(e);
      console.error(e);
    }
  } else {
    res.render('login',{ error: 'Wrong username or password!'});
  }
});


module.exports = router;