const userModel = require('../models/userModel')
const bcrypt = require('bcryptjs')
const otpGen = require('otp-generator')
require('dotenv').config()
const fast2sms = require('fast-two-sms')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')

exports.login = async(req,res)=>{               // login using jwt token signing in with jwt
    try {
        const userMobile = {userMobile:req.body.mobile}
        
        const findUser = await userModel.findOne({
            mobile: req.body.mobile
        })

        const result = await bcrypt.compare(req.body.mpin,findUser.mpin)

        if(result)
        {
            const accessToken = jwt.sign(userMobile,process.env.ACCESS_TOKEN_SECRET,{expiresIn:'30d'})
            res.json({
                message: "Signin Success !!",
                token: accessToken
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

    
    // const otp = otpGen.generate(6,{upperCaseAlphabets: false, specialChars: false,lowerCaseAlphabets: false})            //using nodemaier

    // const options = {
    //     from: "prasadrobosoft@gmail.com",
    //     to: "vbhat.prasad@gmail.com",
    //     subject:"check your otp for password manager",
    //     text: `${otp}`
    // }

    // const transporter = nodemailer.createTransport({
    //     service:"zohomail",
    //     auth: {
    //         user: "prasadrobosoft@gmail.com",
    //         pass: ""
    //     },
    //     port:465,
    //     host:"smtp.zoho.in",
    //     secure:true
    // })

    // await transporter.sendMail(options,(err,info)=>{
    //     if(err)
    //     {
    //         res.send(err)
    //     }else{
    //         res.send(info)
    //     }
    // })


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