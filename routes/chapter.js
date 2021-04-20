const express = require("express");
const router = express.Router();
const methodOverride = require('method-override');
var mongoose = require('mongoose');

// imoprt Model
const Chapters = require("../models/Chapter");

// Grab the form data
router.use(express.urlencoded({extended : true}));

router.use(methodOverride('_method'));


// load the form 
router.get('/chapter/add/:id' , (req ,res ) => {
     
    var manga_id = req.params.id;
    var user_id =  req.user._id;
    console.log(req.params.id)
    res.render('chapter/add' , {manga_id , user_id})
    
   
  })

  // post the data
  router.post('/chapter/add' , (req ,res ) => {
    
    console.log("manga , id")
    console.log(req.body.manga_id)
    console.log(req.body.created_by)
   // var id = mongoose.Types.ObjectId(req.body.manga_id.trim());
    //req.body.manga_id=id;
   let chapterLinks = req.body.pages;
   let arr = chapterLinks.split('\n');
   arr.splice(arr.indexOf(""),1);

   //console.log(arr);
   req.body.pages = arr;
  let chapter =  new Chapters(req.body);

   chapter.save()
   .then(()=>{
    res.redirect("/manga/show/"+req.body.manga_id)
    console.log("done")
})
   .catch((err)=>{
    console.log(err);
    res.send("Error");
})
   
})

// show
router.get('/chapter/show/:id' , (req ,res ) => {

   // console.log(req.params.id);
   Chapters.findById(req.params.id)
   .then((chapter)=>{
       console.log(chapter)
   res.render("chapter/show" , {chapter})
    console.log("done")
})
   .catch((err)=>{
    console.log(err);
    res.send("Error");
})
      
})

// edit 
router.get('/chapter/edit/:id' , (req ,res ) => {
    
    Chapters.findById(req.params.id)
    .then((chapter)=>{
       // console.log(chapter)
        res.render("chapter/edit" , {chapter})
    })
       .catch((err)=>{
        console.log(err);
        res.send("Error");
    })
  })


  router.put("/chapter/edit/" , (req,res)=>{
   const newData = {
        title : req.body.title,
        number : req.body.number,
        pages : req.body. pages,
        manga_id : req.body.manga_id,  
    }

     var id = req.query.id;
    Chapters.findByIdAndUpdate({_id : id} , {$set : newData} , function(err, result){
       if(err){
           console.log(err)
       }
       else{
           res.redirect("/");
       }
   })

})

// delete
//delete
router.get("/chapter/delete/:id", (req,res)=>{
    Chapters.findByIdAndDelete(req.params.id)
    .then(()=>{
        res.redirect("/")
    })
    .catch(err => {
        console.log(err);
    })
})

  
  module.exports = router;


 