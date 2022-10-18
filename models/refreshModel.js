const mongoose = require('mongoose')

const refreshSchema = mongoose.Schema({
    mobile: String,
    refresh_token: String,
    created: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('tokenDetails',refreshSchema)