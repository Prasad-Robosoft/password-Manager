const userModel = require('../models/userModel')
const bcrypt = require('bcryptjs')
const otpGen = require('otp-generator')
require('dotenv').config()
const fast2sms = require('fast-two-sms')
const jwt = require('jsonwebtoken')

exports.login = async(req,res)=>{
    try {
        const userMobile = {userMobile:req.body.mobile}

        const findUser = await userModel.findOne({
            mobile: req.body.mobile
        })
        
        const result = await bcrypt.compare(req.body.mpin,findUser.mpin)
        
            const accessToken = jwt.sign(userMobile,process.env.ACCESS_TOKEN_SECRET,{expiresIn:'5h'})
            res.json({
                message: `Signin success!! ${req.user.userMobile}`,
                token: accessToken
            })

            
    } catch (error) {
        res.status(401).send(error.statement)
    }
}

exports.fogotPassword = async(req,res)=>{
    /*
            try {                                                           //OTP USING TWILLIO
                accountSid = process.env.ACCOUNT_SID
                authToken = process.env.AUTH_TOKEN      
                mobile = req.body.mobile
                const otp = otpGen.generate(6,{upperCaseAlphabets: false, specialChars: false,lowerCaseAlphabets: false})
                const twilio = require('twilio')(accountSid,authToken)
                console.log(otp)
                await twilio.messages.create({
                    from:'+919481676348',
                    to: `+916362754485`,
                    body: `Your otp from Prasad's password manager is ${otp}`
                }).then(message =>{
                    res.send(message)
                    console.log(message)
                }).catch(error=>{
                    console.log(error)
                    res.send(error)
                })
            } catch (error) {
                res.send(error.message)
            }
            */
    try {

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
        res.status(401).send(err.message)
    }
}