const express = require('express')
const router = express.Router()
const {saveSites,getSites,filterSites,editSite}= require('../controller/siteControl')
const app = require('../index')
const authenticate = require('../middlewares/access')

router.route('/saveSites').post(authenticate,saveSites)
router.route('/getSites').get(authenticate,getSites)
router.route('/filterSites').post(authenticate,filterSites)
router.route('/editSite').post(authenticate,editSite)

module.exports = router