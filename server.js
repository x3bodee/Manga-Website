require('dotenv').config()

const express = require("express");

const mongoose = require("mongoose");

const PORT = process.env.PORT;

const expresslayouts = require("express-ejs-layouts");
var flash = require('connect-flash');

// Initialize express
const app = express();

// Look for static files here in this folder
app.use(express.static("public"));

// Look into the views folder for layout.ejs file
app.use(expresslayouts);

//Express Session and Passport
let session = require('express-session');
let passport = require('./helper/ppConfig');

app.use(session({
  secret: process.env.SECRET,
  saveUninitialized: true,
  resave: false,
  cookie: {
    maxAge: 36000000
  }
}))

// Initialize Passport and Passport Session
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

// // Sharing information to other pages
 app.use(function(req, res, next){
     res.locals.currentUser = req.user;
     res.locals.alerts = req.flash();
     next();
 })

app.set('view engine', 'ejs');

// routes
app.use(require('./routes/chapter'))
app.use(require('./routes/Auth'))

//console.log(process.env.mongoDBURL);

mongoose.connect(
    process.env.mongoDBURL,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    },
    () => {
      console.log("Mongodb connected seccessfully!!!");
    }
  );

app.listen(PORT, () => console.log(`server manga work now ${PORT} `))

app.get('/', (req, res) => {

  res.render('home/home')

})


app.get('/manga', (req, res) => {

  res.render('manga/show')

})

app.get('/manga/add', (req, res) => {

  res.render('manga/add')

})


app.get('/chapter', (req, res) => {

  res.render('chapter/show')

})
app.get('/signup' , (req ,res ) => {

  res.render('auth/signup')
 
})
app.get('/allmanga' , (req ,res ) => {

  res.render('manga/allManga')
 
})
