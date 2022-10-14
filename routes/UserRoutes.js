const express = require('express')
const router = express.Router()
const app = require('../index')
const {signup} = require('../controller/signupControl')
const {login,sendOtp,forgotPassword} = require('../controller/signinControl')

router.route('/signup').post(signup)
router.route('/signin').post(login)
router.route('/sendOtp').post(sendOtp)
router.route('/forgotPassword').post(forgotPassword)

module.exports = router