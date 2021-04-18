const express = require("express");
const router = express.Router();
const methodOverride = require('method-override');

// imoprt Model
const Chapters = require("../models/Chapter");

// Grab the form data
router.use(express.urlencoded({extended : true}));

router.use(methodOverride('_method'));


// load the form 
router.get('/chapter/add' , (req ,res ) => {

    res.render('chapter/add')
   
  })

  // post the data
  router.post('/chapter/add' , (req ,res ) => {

   let chapterLinks = req.body.pages;
   let arr = chapterLinks.split('\n');
   arr.splice(arr.indexOf(""),1);

   //console.log(arr);
   req.body.pages = arr;
  let chapter =  new Chapters(req.body);

   chapter.save()
   .then(()=>{
    //res.redirect("/article/index")
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

  
  module.exports = router;


 