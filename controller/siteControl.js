const siteSchema = require('../models/sitesModel')
const encrypt = require('../utils/encrypt')

exports.saveSites = async(req,res)=>{                                          //creates sites which has to be saved
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
        res.status(400).send(error.message)
    }
}


exports.getSites = async(req,res)=>{                                    //gets site details of a perticular user
    try {
        const page = req.query.page
        const limit = req.query.limit

        siteCounts = await siteSchema.countDocuments({
            mobile: req.user.userMobile
        })
        
        details= await siteSchema.find({
            mobile: req.user.userMobile
        }).limit(limit).skip((page-1)*limit)                                   //pagination

        console.log(page)
        res.send(details)
    } catch (error) {
        res.status(400).send(error.message)
    }
}


exports.filterSites = async(req,res)=>{                                 //filters sites through social media
    try {
        response = await siteSchema.find({
            mobile: req.user.userMobile,
            sector: `${req.body.sector}`
        })
        res.send(response)
    } catch (error) {
        res.status(400).send(error.message)
    }
}

exports.editSite = async(req,res)=>{                                   //edit details of sites and for passwords it gets encrypted
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
        res.status(400).send(error.message)
    }
}

exports.search = async(req,res)=>{                                     //search sites by notes sector and name
    try {
        results = await siteSchema.find({
            mobile: req.user.userMobile
        }).find({
            $or: [
                {notes:{$regex: req.body.text}},
                {sector:{$regex: req.body.text}},
                {name:{$regex: req.body.text}},
            ]
        })

        res.send(results)
    } catch (error) {
        res.send(400).send(error.message)
    }
}


