var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/secret', function(req, res, next) {
  if (req.session.loggedin) {
    res.send('You are logged in.');
  } else {
      res.send('Please login to view this page!');
  }
});

module.exports = router;