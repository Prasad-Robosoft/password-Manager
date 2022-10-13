const userModel = require('../models/userModel')
const jwt = require('jsonwebtoken')

exports.signup = async(req,res)=>{
    try {
        const userMobile = {userMobile:req.body.mobile}
        await userModel.create({
            mobile: req.body.mobile,
            mpin: req.body.mpin
        })
        res.send("signup success !!")
    } catch (error) {
        res.send(error.message)
    }
}

