require('dotenv').config();
const express = require("express");

const mongoose = require("mongoose");

const PORT = process.env.PORT;

const expresslayouts = require("express-ejs-layouts");
// var flash = require('connect-flash');

// Initialize express
const app = express();

// Look for static files here in this folder
app.use(express.static("public"));

// Look into the views folder for layout.ejs file
app.use(expresslayouts);

// Import Routes
// const indexRoute = require('./routes/index');
// const articleRoute = require('./routes/article');
// const authRoute = require('./routes/auth');

// Express Session and Passport
// let session = require('express-session');
// let passport = require('./helper/ppConfig');

// app.use(session({
//     secret: process.env.SECRET,
//     saveUninitialized: true,
//     resave: false,
//     cookie: {maxAge: 360000}
// }))

// Initialize Passport and Passport Session
// app.use(passport.initialize());
// app.use(passport.session());

// app.use(flash());

// Sharing information to other pages
// app.use(function(req, res, next){
//     res.locals.currentUser = req.user;
//     res.locals.alerts = req.flash();
//     next();
// })


// Mount Routes
// app.use('/', indexRoute);
// app.use('/', articleRoute);
// app.use('/', authRoute);

// Setting view engine to ejs.
// Node.js to look into the folder views for all ejs files
app.set("view engine", "ejs");

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

// Listen for HTTP request on PORT 4000
app.listen(PORT, () => {
  console.log(`Running on PORT  ${PORT}`);
});