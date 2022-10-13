const mongoose = require('mongoose')
const crypto = require('crypto');
const algorithm = 'aes-256-cbc'; //Using AES encryption
const key = "46654646546546";
const iv = "2113232131313131333";

const siteSchema = mongoose.Schema({
    mobile: String,
    userName:String,
    url:String,
    name:String,
    sector:String,
    password:String,
    notes:String
})
console.log(key)
console.log(iv)
function encrypt(text) {
    let cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key), iv);
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return { iv: iv.toString('hex'), encryptedData: encrypted.toString('hex') };
 }
 
siteSchema.pre('save',async function(next){
    const hash = encrypt(this.password)
    this.password = hash.encryptedData
    next()
})

module.exports = mongoose.model('siteDetails',siteSchema)