const router = require('express').Router();
const user = require('../controllers/user-controller.js');
const config = require('../../config/config.js')
const Recaptcha = require('express-recaptcha').Recaptcha
const RECAPTCHA_SITE_KEY = config.recaptcha.siteKey
const RECAPTCHA_SECRET_KEY = config.recaptcha.secretKey
const recaptcha = new Recaptcha(RECAPTCHA_SITE_KEY, RECAPTCHA_SECRET_KEY)

//routes for /user
//checking for availability of username
router.get('/validateusername/:username', user.validateUsername)

//render the register form
router.get('/register', recaptcha.middleware.render, user.registerForm)

//register a new user
router.post('/register', recaptcha.middleware.verify, user.registerUser)

//render a login form
router.get('/login', user.loginForm)

//authenticate and login a user
router.post('/login', user.loginUser)

//destroy session for user by logging out
router.get('/logout', user.logout)


module.exports = router