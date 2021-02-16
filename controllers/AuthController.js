const { body, validationResult  } = require('express-validator');
const { query } = require('../models/db');
const bcrypt = require('bcrypt');

module.exports.store = async function(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.render('login',{ username: req.body.username, errors: errors.array()});
  }
  const username = req.body.username;
  const password = req.body.password;

  try {
    const sql = 'SELECT password FROM users WHERE name = ?';
    const result = await query(sql, username);

    if(result.length > 0) {
      bcrypt.compare(password, result[0].password, function(err, result) {
        if (result == true) {
          req.session.loggedin = true;
          req.session.username = username;
          res.redirect('/home');
        } else {
          res.render('login',{ username: req.body.username, errors: 'Wrong username or password!'});
        }
      });
    } else {
      res.render('login',{ username: req.body.username, errors: 'Wrong username or password!'});
    }
  } catch (e) {
    next(e);
    console.error(e);
  }
};

module.exports.destroy = async function(req, res, next) {
  if (req.session) {
    req.session.destroy(err => {
      if (err) {
        res.status(400).send('Unable to log out');
      } else {
        res.send('Logout successful');
      }
    });
  } else {
    res.end();
  }
};


/*
Verb	URI	Action	Route Name
GET	/photos	index	photos.index
GET	/photos/create	create	photos.create
POST	/photos	store	photos.store
GET	/photos/{photo}	show	photos.show
GET	/photos/{photo}/edit	edit	photos.edit
PUT/PATCH	/photos/{photo}	update	photos.update
DELETE	/photos/{photo}	destroy	photos.destroy
*/