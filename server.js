const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const db = require('./db')
const menuItem = require('./models/Menu')
require('dotenv').config()
const passport = require('./auth')
PORT = process.env.PORT || 3000 ;

// Middleware 
const logRequest = (req, res , next)=>{
  console.log(`[${new Date().toLocaleString()}] Request made to : ${req.originalUrl}`);
  next();
}

app.use(bodyParser.json())
app.use(logRequest)

app.use(passport.initialize())
const localAuthMiddleware = passport.authenticate('local', {session:false})

app.get('/', (req, res) => {
  res.send('Welcome to my hotel ;')
})

//import router File
const personRoutes = require('./routes/personRoutes')
app.use('/person',localAuthMiddleware, personRoutes)

const menuRoutes = require('./routes/menuRoutes')
app.use('/menu', menuRoutes)

app.listen(PORT, ()=>{console.log("listening on port 3000")})