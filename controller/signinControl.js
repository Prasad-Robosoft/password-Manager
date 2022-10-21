const userModel = require('../models/userModel')
const bcrypt = require('bcryptjs')
const otpGen = require('otp-generator')
require('dotenv').config()
const fast2sms = require('fast-two-sms')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')
const refreshModel = require('../models/refreshModel')
const axios = require('axios')

exports.login = async(req,res)=>{               // login using jwt token signing in with jwt
    try {
        const userMobile = {userMobile:req.body.mobile}
        
        const findUser = await userModel.findOne({
            mobile: req.body.mobile
        })

        const result = await bcrypt.compare(req.body.mpin,findUser.mpin)

        if(result)
        {
            const accessToken = await axios.post('http://localhost:3000/api/v1/getRefresh',{
                mobile: req.body.mobile
            })

            res.json({
                message: "Signin Success !!",
                token: accessToken.data
            })
        }else{
            res.send("account cannot be created")
        }
            
    } catch (error) {
        res.status(400).send(error.statement)
    }
}

exports.sendOtp = async(req,res)=>{
   
    try {                                                   //otp generation using fast2sms

        const otp = otpGen.generate(6,{upperCaseAlphabets: false, specialChars: false,lowerCaseAlphabets: false})
        mobile = req.body.mobile
        console.log(otp)

        var options = {
            authorization: 'es65wvHJx478yANDQCoZLImbERnrqT9MjSa1VlWOFPUz2iKGBdMtR5gsv190FVGLoZkbzxmclNOfUTJ6',
            message: `your otp number is ${otp}`,
            numbers: [`${mobile}`]
        }

        const response = await fast2sms.sendMessage(options).then((response)=>{
            console.log(response)
        }).catch((err)=>{
            res.status(401).send(err.message)
        })
        res.send(response)
    } catch (err) {
        res.status(400).send(err.message)
    }

}

exports.forgotPassword = async(req,res)=>{                  //hash the password and update to db
    try {
        console.log(req.body.mpin)
        hashedPassword = await bcrypt.hash(req.body.mpin,10)

        await userModel.findOneAndUpdate({
            mobile:req.body.mobile
        },{
            mpin: hashedPassword
        })
        res.send("Password successfully updated")
    } catch (error) {
        res.send(error.message)
    }
}



exports.getAccessToken = async(req,res)=>{
    const userMobile = {userMobile: req.user.userMobile}

    const created = await refreshModel.findOne({
        mobile: req.user.userMobile
    }).select('created')

    const created_date = created.created
    cur_date = new Date()

    const expiry_date = created_date.setDate(created_date.getDate()+ parseInt(30))
    cur_date  = cur_date.setDate(cur_date.getDate()+ parseInt(0))

    if(cur_date<expiry_date)
    {
        access_token = jwt.sign(userMobile,process.env.ACCESS_TOKEN_SECRET,{expiresIn:'30m'})
        res.json({
            "access token": access_token
        })
    }
    else{
        
        const deleted = await refreshModel.deleteOne({
            mobile: req.user.userMobile
        })
        res.send('refresh token expired')
    }
    
}


exports.getRefresh = async(req,res)=>{
   try {
    const userMobile = {userMobile: req.body.mobile}

    const found = await refreshModel.findOne({
        mobile: req.body.mobile
    })

    if(!found)
    {
        refresh_token = jwt.sign(userMobile,process.env.ACCESS_TOKEN_SECRET,{expiresIn:'30d'})

        await refreshModel.create({
            mobile: req.body.mobile,
            refresh_token: refresh_token
        })

        access_token = jwt.sign(userMobile,process.env.ACCESS_TOKEN_SECRET,{expiresIn:'30m'})

        res.json({
            "access token": access_token
        })
    }else{
        res.send("refresh token is live")
    }
   } catch (error) {
        res.send(error.message)
   }
}