const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const session = require('express-session')
const flash = require('connect-flash')
require('dotenv').config()
const methodOverride = require('method-override')


const app = express()
const port = process.env.PORT || 3000


app.use(express.urlencoded( { extended: true } ))
app.use(express.static('public'))
app.use(expressLayouts)
app.use(methodOverride('_method'))

app.use(session({
  secret: process.env.SESSION_SECRET,
  saveUninitialized: true,
  resave: true
}))
app.use(flash())


app.set('layout', './layouts/main')
app.set('view engine', 'ejs')

const routes = require('./server/routes/bookRoutes.js')
app.use('/', routes)

app.listen(port, ()=> console.log(`Listening to port ${port}`))