const userModel = require('../models/userModel')


exports.signup = async(req,res)=>{             //registering users using mobile number and 6 digit mpin
    try {
        
        await userModel.create({
            mobile: req.body.mobile,
            mpin: req.body.mpin
        })
        res.send("signup success !!")
    } catch (error) {
        res.status(401).send(error.message)
    }
}

