const mongoose = require('mongoose')

const refreshSchema = mongoose.Schema({
    mobile: String,
    refresh_token: String,
    created: {
        type: Date,
        default: new Date().toISOString()
    }
})

module.exports = mongoose.model('tokenDetails',refreshSchema)