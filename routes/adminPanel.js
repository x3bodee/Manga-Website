const express = require("express");
const router = express.Router();
var mongoose = require('mongoose');

// imoprt Model
const User = require("../models/User");
const Chapter = require("../models/Chapter");
const Request = require("../models/Request");


// Grab the form data
router.use(express.urlencoded({extended : true}));

// users data
router.get('/admin/users' , (req ,res ) => {

  User.find()
  .then(user =>{
      res.render("admin/users" , {layout: 'admin' , user} )
  })
  .catch(err =>{
      console.log(err)
  })
   
  })

  // updata user data
router.post("/admin/userss" , (req,res)=>{
  const newData = {
    username : req.body.username,
    email : req.body.email,
    type : req.body.type,
   
  }

  console.log(newData)
  var id = req.query.id;
  User.findByIdAndUpdate({_id : id} , {$set : newData})
  .then((user)=>{
      console.log("done")
      res.redirect("/admin/users")
      console.log(user)
  })
  .catch(err=>console.log(err))

})

// delete user
router.post("/admin/userDelete", (req,res)=>{
  console.log("delete")
  console.log(req.body.username)
  User.findByIdAndDelete(req.query.id)
  .then(()=>{
      res.redirect("/admin/users")
  })
  .catch(err => {
      console.log(err);
  })
})

// chapters data
router.get('/admin/chapters' , (req ,res ) => {

  Chapter.find()
  .then(chapter =>{
      res.render("admin/chapters" , {chapter})
  })
  .catch(err =>{
      console.log(err)
  })
   
  })

  
// requset
router.get('/admin/requests' , (req ,res ) => {


  Request.find().populate({path : "user_id" , select:["username"]})
   .then(requset =>{
    console.log(requset)
     res.render("admin/requests" ,{layout: 'admin' , requset})
  })
  .catch(err =>{
      console.log(err)
  })
   
  })

 // update request
 router.post('/admin/requests' , (req ,res ) => { 
   console.log("id 111")
  let request_id = req.query.request_id;
 // console.log(request_id);

  const newData = {
    isClosed : true,
    response : req.body.response,
    status :req.body.status
  };

  Request.findByIdAndUpdate({_id : request_id } , {$set : newData})
  .then((user)=>{
     // console.log("done")
      if(req.body.status){
      //  console.log("if done")
        User.findByIdAndUpdate({_id : req.body.user_id}, {$set :{type : "3"}})
        .then(user=>{
          res.redirect("/admin/requests")
        })
        .catch(err =>{
          console.log(err)
      })
      }else{
        res.redirect("/admin/requests")
      }
  })
  .catch(err=>console.log(err))
 })

module.exports = router;


