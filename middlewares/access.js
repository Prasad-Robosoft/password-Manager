const jwt = require('jsonwebtoken')

function authenticate(req,res,next){
    try {
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]
        if(token==null) return res.send('please add auth header')
        jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,user)=>{
        if(err) return res.status(401).send(err)
        req.user = user
    })
    } catch (error) {
        res.send(error.message)
    }
    next()
}

module.exports = authenticate