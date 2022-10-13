const siteSchema = require('../models/sitesModel')

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
        details= await siteSchema.find({
            mobile: req.user.userMobile
        })
        res.send(details)
    } catch (error) {
        res.status(401).send(error.message)
    }
}


exports.filterSites = async(req,res)=>{
    try {
        response = await siteSchema.find({
            mobile: req.user.userMobile
        })
        res.send(response)
    } catch (error) {
        res.status(401).send(error.message)
    }
}

exports.editSite = async(req,res)=>{
    try {
        response = await siteSchema.findOneAndUpdate({
            mobile: req.user.userMobile,
            sector: "social media"
        },{
            url: req.body.url,
            name: req.body.name,
            sector:req.body.sector,
            userName: req.body.userName,
            password: req.body.password,
            notes: req.body.notes
        })
        res.send("updated Successfully!!")
    } catch (error) {
        res.status(401).send(error.message)
    }
}