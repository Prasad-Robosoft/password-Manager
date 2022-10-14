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
    notes:String,
    updatedOn : {
        type: Date,
        default: Date.now()
    }
})

 
siteSchema.pre('save',async function(next){
    const encryptedString = encrypt(this.password)
    this.password = encryptedString
    next()
})


module.exports = mongoose.model('siteDetails',siteSchema)