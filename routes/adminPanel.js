const express = require("express");
const router = express.Router();

// imoprt Model
const User = require("../models/User");
const Chapter = require("../models/Chapter");


// Grab the form data
router.use(express.urlencoded({extended : true}));

// users
router.get('/admin/users' , (req ,res ) => {

  User.find()
  .then(user =>{
      res.render("admin/users" , {user})
  })
  .catch(err =>{
      console.log(err)
  })
   
  })

// update user by admin
  router.get("/admin/userUpdate" , (req, res) =>{
     
    User.findById(req.query.id)
    .then((user)=>{
        res.render("admin/userUpdate" , {user})
    })
    .catch((err)=>{
        console.log(err);
        res.send("Error");
    }) 

  })

router.post("/admin/userUpdate" , (req,res)=>{
  const newData = {
    username : req.body.username,
    email : req.body.email,
    type : req.body. type,
   
  }

  var id = req.query.id;
  User.findByIdAndUpdate({_id : id} , {$set : newData} , function(err, result){
     if(err){
         console.log(err)
     }
     else{
         res.redirect("/admin/users");
     }
 })

})

// delete user
router.get("/admin/userDelete", (req,res)=>{
  User.findByIdAndDelete(req.query.id)
  .then(()=>{
      res.redirect("/admin/users")
  })
  .catch(err => {
      console.log(err);
  })
})

// chapter
router.get('/admin/chapters' , (req ,res ) => {

  Chapter.find()
  .then(chapter =>{
      res.render("admin/chapters" , {chapter})
  })
  .catch(err =>{
      console.log(err)
  })
   
  })

  
// update chapter by admin
router.get("/admin/userUpdate" , (req, res) =>{
     
  User.findById(req.query.id)
  .then((user)=>{
      res.render("admin/userUpdate" , {user})
  })
  .catch((err)=>{
      console.log(err);
      res.send("Error");
  }) 

})

router.post("/admin/userUpdate" , (req,res)=>{
const newData = {
  username : req.body.username,
  email : req.body.email,
  type : req.body. type,
 
}

var id = req.query.id;
User.findByIdAndUpdate({_id : id} , {$set : newData} , function(err, result){
   if(err){
       console.log(err)
   }
   else{
       res.redirect("/admin/users");
   }
})

})


module.exports = router;