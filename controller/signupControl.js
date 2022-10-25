const userModel = require('../models/userModel')


exports.signup = async(req,res)=>{             //registering users using mobile number and 6 digit mpin
    try {
        const find = await userModel.findOne({
            mobile:req.body.mobile
        })

        if(find)
        {
            res.send("user already exist")
        }else
        {
            await userModel.create({
                mobile: req.body.mobile,
                mpin: req.body.mpin
            })
        }
        res.send("signup success !!")
    } catch (error) {
        res.status(400).send(error.message)
    }
}

