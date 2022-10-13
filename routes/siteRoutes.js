const express = require('express')
const router = express.Router()
const {saveSites,getSites}= require('../controller/siteControl')
const app = require('../index')
const authenticate = require('../middlewares/access')

router.route('/saveSites').post(authenticate,saveSites)
router.route('/getSites').get(authenticate,getSites)

module.exports = router