const express = require('express')
const mongoose = require('mongoose')
const config = require('config')
const bp = require('body-parser')
const authRoute = require('./routes/authRoute')

const app = express()

app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))
app.use('/api/auth',authRoute)


const mongo = "mongodb+srv://surovjeniya:19953101qw@cluster1.zxkxd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
const PORT = config.get('port') || 5000
const mongoURI = config.get('mongoURI') || mongo

async function start() {
    try {
        await mongoose.connect(mongoURI)
        app.listen(PORT,() => {
            console.log("Server has been started on port: ",PORT)
        })
    }catch(e) {
        console.error('Server error. ',e.message)
    }
}

start()