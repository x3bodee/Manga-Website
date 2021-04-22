// All my authentication routes will go here
const express = require('express');
const router = express.Router();
const bcrypt = require("bcrypt");
const salt = 10;

// Import passport configurations
let passport = require("../helper/ppConfig");
let isLoggedin = require("../helper/isLoggedin");
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
  req.body.username=req.body.username.trim();
  req.body.email=req.body.email.trim();
  let user = new User(req.body);
  console.log(req.body)
  
  User.count({
      username: user.username
    })
    .then((count) => {
      if (count > 0) {
        console.log("user exist");
        res.redirect('/signup');
        //req.flash("error", "username already exists!!");

      }else{
        console.log("creating the user");
        let hash = bcrypt.hashSync(req.body.password, salt);
        user.password = hash;
        user.save()
        .then(() => {
          console.log("now I am sending you back");
          passport.authenticate("local", {
            successRedirect: "/",
            failureRedirect: "/auth/signup"
          })(req, res)
        })
        .catch((err) => {
          console.log(err);
          res.render("err/index",{err});
        });
  
      }// else end
      //     console.log(" INCOUNT ")
    })
    .catch((err)=>{                    
      console.log(err);
      res.render("err/index",{err});
    })
  //   console.log(" END COUNT")
  
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

// HTTP GET - Profile Route
router.get("/profile", isLoggedin, (req, res) => {
  console.log(req.user)
  let user = req.user;
  res.render("profile/profile", {
    user
  });

});

//HTTP POST - Profile Updata email and password Route

router.post('/profile', isLoggedin, (req, res) => {
  const updatedata = {

  }

  let email = req.user.email;
  let password = req.user.password;
  if (req.body.email != null && req.body.email != undefined && req.body.email != "") {
    if (req.body.email != email) {
      updatedata.email = req.body.email.trim();
    }
  }
  let hash = bcrypt.hashSync(req.body.password, salt);
  if (req.body.password != null && req.body.password != undefined && req.body.password != ""){
    if (!bcrypt.compareSync(hash,password)) {
    updatedata.password = hash;
  }}
  
  

  let id = req.body.user_id;
  console.log(id)
  User.findByIdAndUpdate({
      _id: id
    }, {
      $set: updatedata
    })
    .then((testuser) => {
      console.log("then")
      console.log(testuser)
      res.redirect("/")
    })
    .catch(err => {
      console.log(err);
      res.render("err/index",{err});
    })

})




module.exports = router;