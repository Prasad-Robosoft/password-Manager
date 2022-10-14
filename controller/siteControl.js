const siteSchema = require('../models/sitesModel')
const encrypt = require('../utils/encrypt')

exports.saveSites = async(req,res)=>{
    try {
        await siteSchema.create({
            mobile:req.user.userMobile,
            url: req.body.url,
            name: req.body.name,
            sector:req.body.sector,
            userName: req.body.userName,
            password: req.body.password,
            notes: req.body.notes
        })
     
        res.send("password successfully saved!!")
    } catch (error) {
        res.status(401).send(error.message)
    }
}


exports.getSites = async(req,res)=>{
    try {
        const page = req.query.page
        const limit = req.query.limit

        siteCounts = await siteSchema.countDocuments({
            mobile: req.user.userMobile
        })
        
        details= await siteSchema.find({
            mobile: req.user.userMobile
        }).limit(limit).skip((page-1)*limit)

        console.log(page)
        res.send(details)
    } catch (error) {
        res.status(401).send(error.message)
    }
}


exports.filterSites = async(req,res)=>{
    try {
        response = await siteSchema.find({
            mobile: req.user.userMobile,
            sector: "social media"
        })
        res.send(response)
    } catch (error) {
        res.status(401).send(error.message)
    }
}

exports.editSite = async(req,res)=>{
    try {
        found = await siteSchema.findByIdAndUpdate(req.body._id,{
            url: req.body.url,
            name: req.body.name,
            sector:req.body.sector,
            userName: req.body.userName,
            password: encrypt(req.body.password),
            notes: req.body.notes
        })
        console.log(found)
        res.send("updated Successfully!!")
    } catch (error) {
        res.status(401).send(error.message)
    }
}