const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = mongoose.Schema({
    mobile: {
        type: String,
        unique: true,
        required: true,
        maxlength: 10,
        minlength: 10
        
    },
    mpin: {
        type: String,
        required: true,
        maxlength: 6,
        minlength: 6
    },
    created: {
        type: Date,
        default: Date.now()
    }
})

userSchema.pre('save',async function(next){
    this.mpin = await bcrypt.hash(this.mpin,10)
    next()
})



module.exports = mongoose.model('userDetails',userSchema)