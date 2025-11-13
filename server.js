const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const db = require('./db')
const menuItem = require('./models/Menu')

app.use(bodyParser.json())
app.get('/', (req, res) => {
  res.send('Welcome to my hotel ;')
})

//import router File
const personRoutes = require('./routes/personRoutes')
app.use('/person', personRoutes)

const menuRoutes = require('./routes/menuRoutes')
app.use('/menu', menuRoutes)

app.listen(3000, ()=>{console.log("listening on port 3000")})