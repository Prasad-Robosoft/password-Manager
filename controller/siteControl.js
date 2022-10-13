const siteSchema = require('../models/sitesModel')
const userSchema = require('../models/userModel')

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
        res.send(error.message)
    }
}


exports.getSites = async(req,res)=>{
    try {
        details= await siteSchema.find({
            mobile: req.user.userMobile
        })
        res.send(details)
    } catch (error) {
        res.send(error.message)
    }
}