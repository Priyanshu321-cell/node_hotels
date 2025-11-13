const mongoose = require('mongoose')


// define a mongodb connection URL
const mongoURL = 'mongodb://127.0.0.1:27017/hotels'

// setup a connection
mongoose.connect(mongoURL)

const db = mongoose.connection;

db.on('connection',()=>{
    console.log("connected to mongoDB server !");
})

db.on('error', (err)=>{
    console.log("MongoDB connection error : ", err)
})

db.on('disconnected', ()=>{
    console.log('MongoDB disconnected')
})

module.exports = db;