const express = require('express')
const app = express()
require('dotenv').config()
const cors = require('cors')
const mongoose = require('mongoose')
const userRouter = require('./routes/UserRoutes')
const siteRouter = require('./routes/siteRoutes')
const helmet = require('helmet')
const rateLimit = require("express-rate-limit");


port = process.env.PORT
mongo_url = process.env.MONGO_URL

app.listen(port,()=>{
    console.log(`running on port ${port}`)
})

const limiter = rateLimit({                  //limits api hits to only 2000 per hour                               
    max: 2000,
    windowMs: 60 * 60 * 1000,
    message: "Too many request from this IP",
    standardHeaders: true, 
	legacyHeaders: false,
});

mongoose.connect(mongo_url).then(()=>{              //mongodb connection
    console.log('connected to password manager database')
}).catch(()=>{
    console.log('sorry!! could not connect to database')
}) 

//all middlewares
app.use(express.json())
app.use(cors())
app.use(helmet())
app.use(limiter)
app.use('/api/v1',userRouter)
app.use('/api/v1',siteRouter)

module.exports = app