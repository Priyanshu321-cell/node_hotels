const mongoose = require('mongoose')
require('dotenv').config();

// define a mongodb connection URL
// const mongoURL = process.env.MONGODB_URL_LOCAL //local
const mongoURL = process.env.MONGODB_URL // online

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