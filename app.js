const path = require('path')
const express = require('express')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const morgan = require('morgan')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const passport = require('passport')
const session = require('express-session')
// ! Don't add (session) to end of ('connect-mongo') this is out of date
const MongoStore = require('connect-mongo')
const connectDB = require('./config/database')

// Load config
dotenv.config({ path: './config/.env' })

// Passport config
require('./config/passport')(passport)


connectDB()

const app = express()

// Body Parser
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// Method Override Middleware
app.use(methodOverride(function (req, res) {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
    let method = req.body._method
    delete req.body._method
    return method
  }
}))

// Logging
//! morgan logs what pages are being touched
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

// Handlebars Helpers
const { formatDate, stripTags, truncate, editIcon, select } = require('./helpers/hbs')


// Handlebars
//! add the word .engine after exphbs
//here we set default layout that wraps around all of the body of all of the pages
app.engine('.hbs', exphbs.engine({
  helpers: {
    formatDate,
    stripTags,
    truncate,
    editIcon,
    select,
  },
  defaultLayout: 'main',
  extname: '.hbs'
  })
)
app.set('view engine', '.hbs')

// Session Middleware
//! Must come before Passport Middleware
app.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    // !Again tutorial out of date, different line of code here
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI
    })
  })
)

// Passport Middleware
app.use(passport.initialize())
app.use(passport.session())


// Set global var
app.use(function (req, res, next) {
  res.locals.user = req.user || null
  next()
})
// Static Folder
app.use(express.static(path.join(__dirname, 'public')))

// Routes
app.use('/', require('./routes/index'))
app.use('/auth', require('./routes/auth'))
// app.use('/articles', require('./routes/articles'))

const PORT = process.env.PORT || 2022

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`))