const express = require('express')
const app = express()
require('dotenv').config()
const cors = require('cors')
const mongoose = require('mongoose')
const userRouter = require('./routes/UserRoutes')
const siteRouter = require('./routes/siteRoutes')
const helmet = require('helmet')

port = process.env.PORT
mongo_url = process.env.MONGO_URL

app.listen(port,()=>{
    console.log(`running on port ${port}`)
})

mongoose.connect(mongo_url).then(()=>{
    console.log('connected to password manager database')
}).catch(()=>{
    console.log('sorry!! could not connect to database')
}) 

app.use(cors())
app.use(helmet())
app.use(express.json())
app.use(userRouter)
app.use(siteRouter)

module.exports = app