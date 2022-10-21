const refreshModel = require('../models/refreshModel')

exports.logOut = async(req,res)=>{          //deletes refresh token from the database
    try {
        const deleted = await refreshModel.deleteOne({
            mobile: req.user.userMobile
        })
        res.send("signed out succeessfully!!")
    } catch (error) {
        res.send(error.message)
    }
}