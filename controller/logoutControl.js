const refreshModel = require('../models/refreshModel')

exports.logOut = async(req,res)=>{
    try {
        const deleted = await refreshModel.deleteOne({
            mobile: req.user.userMobile
        })
        res.send("signed out succeessfully!!")
    } catch (error) {
        res.send(error.message)
    }
}