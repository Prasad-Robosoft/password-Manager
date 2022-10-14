const mongoose = require('mongoose')
const cryptr = require('cryptr')
const encrypt = require('../utils/encrypt')

const siteSchema = mongoose.Schema({
    mobile: String,
    userName:String,
    url:String,
    name:String,
    sector:String,
    password:String,
    notes:String
})

 
siteSchema.pre('save',async function(next){
    const crypt = new cryptr(process.env.SECRET_KEY)
    const encryptedString = crypt.encrypt(this.password)
    this.password = encryptedString
    next()
})

siteSchema.pre('findOneAndUpdate',async function(next){
    const encryptedString = encrypt(this.password)
    this.password = encryptedString
    console.log(this)
    next()
})


module.exports = mongoose.model('siteDetails',siteSchema)