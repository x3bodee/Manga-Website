// All my authentication routes will go here
const express = require('express');
const router = express.Router();
const bcrypt = require("bcrypt");
const salt = 10;

// Import passport configurations
let passport = require("../helper/ppConfig");

// Import User Model
const User = require("../models/User");
router.use(express.urlencoded({
  extended: true
}));
// HTTP GET - Signup Route - To load the signup form
router.get("/signup", (req, res) => {
  //console.log(" SINUP GET")
  res.render("auth/signup");
});

// HTTP POST - Signup Route - To save the data
router.post("/signup", (req, res) => {
  let user = new User(req.body);
  console.log(req.body)
  User.count({
      username: user.username
    })
    .then((count) => {
      if (count > 0) {
        throw new Error("username already exists!!")
        //req.flash("error", "username already exists!!");

      }
  //     console.log(" INCOUNT ")
    });
  //   console.log(" END COUNT")
  let hash = bcrypt.hashSync(req.body.password, salt);
  user.password = hash;
  user
    .save()
    .then(() => {
      passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/auth/signup"
      })(req, res)
    })
    .catch((err) => {
      res.send("ERRROR!!!");
    });
 
});

// HTTP GET - Signin Route - To load the signin form
router.get("/login", (req, res) => {
  res.render("auth/login");
});

// HTTP POST - Signin Route - To login the user
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login"
  })
);
// router.post('/login' , (req ,res ) => {
//   console.log("LOGIN TEST");
//   })

// HTTP GET - Logout Route
router.get("/logout", (req, res) => {
  req.logout();
  //req.flash("error", "You are logged out successfully.");
  res.redirect("/login");
})

module.exports = router;