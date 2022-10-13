const express = require('express')
const router = express.Router()
const app = require('../index')
const {signup} = require('../controller/signupControl')
const {login,fogotPassword} = require('../controller/signinControl')

router.route('/signup').post(signup)
router.route('/signin').post(login)
router.route('/forgotPassword').post(fogotPassword)

module.exports = router