const express = require('express')
const router = express.Router()
const app = require('../index')
const authenticate = require('../middlewares/access')
const {signup} = require('../controller/signupControl')
const {login,sendOtp,genOtp,verifyOtp,getAccessToken,getRefresh, getSecret} = require('../controller/signinControl')
const {logOut} = require('../controller/logoutControl')

router.route('/signup').post(signup)
router.route('/signin').post(login)
router.route('/sendOtp').post(sendOtp)
router.route('/genOtp').post(genOtp)
router.route('/getSecret').get(getSecret)
router.route('/getAccessToken').get(authenticate,getAccessToken)
router.route('/getRefresh').post(getRefresh)
router.route('/logOut').get(authenticate,logOut)
router.route('/verifyOtp').post(verifyOtp)

module.exports = router