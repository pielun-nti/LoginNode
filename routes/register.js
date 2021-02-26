const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const registercontroller = require('../controllers/Registercontroller');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Register' });
});
/* GET login form */
router.get('/', registercontroller.show);

/* POST login */
router.post('/',
  body('username').notEmpty().trim(),
  body('email').notEmpty().isEmail().trim(),
  body('password').notEmpty(),
  body('passwordconfirmation').custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error('Password confirmation does not match password');
    }
    // Indicates the success of this synchronous custom validator
    return true;
  }),
  registercontroller.store
);

module.exports = router;