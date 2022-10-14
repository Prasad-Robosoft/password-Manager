const cryptr = require('cryptr')

function encrypt(data)
{
    const crypt = new cryptr(process.env.SECRET_KEY)
    const encryptedString = crypt.encrypt(data)
    return encryptedString
}

module.exports = encrypt