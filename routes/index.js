var express = require('express');
var router = express.Router();
const authcontroller = require('../controllers/AuthController.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET topsekret page. */
router.get('/topsecret', function(req, res, next) {
  if (req.session.loggedin) {
    res.send('Du är inloggad.');
  } else {
      res.send('Please login to view this page!');
  }
});

router.post('/logout', authcontroller.destroy);

module.exports = router;