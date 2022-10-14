const express = require('express')
const router = express.Router()
const {saveSites,getSites,filterSites,editSite,search}= require('../controller/siteControl')
const app = require('../index')
const authenticate = require('../middlewares/access')

router.route('/saveSites').post(authenticate,saveSites)
router.route('/getSites').get(authenticate,getSites)
router.route('/filterSites').post(authenticate,filterSites)
router.route('/editSite').put(authenticate,editSite)
router.route('/search').post(authenticate,search)

module.exports = router