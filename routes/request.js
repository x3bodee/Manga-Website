const express = require("express");
const router = express.Router();

// imoprt Model
const Request = require("../models/Request");

const isLoggedin = require('../helper/isLoggedin');

// Grab the form data
router.use(express.urlencoded({extended : true}));

router.get('/request/addRequest' , isLoggedin ,  (req ,res ) => {

    console.log(req.user)
    let id = req.user._id;
    res.render('request/addRequest' , {id})
     
  })

// post the data
  router.post('/request/addRequest' , isLoggedin ,  (req ,res ) => { 

    req.body.isClosed = false;
   let newRequest =  new Request(req.body);

   newRequest.save()
    .then(()=>{
     console.log("done")
 })
    .catch((err)=>{
     console.log(err);
     res.send("Error");
 })

  })


 

  module.exports = router;