const express = require("express");
const router = express.Router();

// imoprt Model
const Response = require("../models/Request");

const isLoggedin = require('../helper/isLoggedin');

// Grab the form data
router.use(express.urlencoded({extended : true}));

router.get('/request/addResponse' , isLoggedin ,  (req ,res ) => {

    console.log(req.user)
    let id = req.user._id;
    res.render('request/addResponse' , {id})
     
  })

// post the data
  router.post('/request/addResponse' , isLoggedin ,  (req ,res ) => { 
//   let user_id=req.params.id;
//   req.body.isClosed=false;
//   console.log(user_id)

//    let newResponse =  newResponse(req.body);
 
//    newResponse.save()
//     .then(()=>{
//      console.log("done")
//  })
//     .catch((err)=>{
//      console.log(err);
//      res.send("Error");
//  })
//  res.render('request/addResponse' , {id})
  })


 

  module.exports = router;