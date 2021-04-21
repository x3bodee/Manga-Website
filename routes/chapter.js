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
    
    //console.log("manga , id")
    //console.log(req.body.manga_id)
    //console.log(req.body.created_by)
   let chapterLinks = req.body.pages;
   let arr = chapterLinks.split('\n');
   arr.splice(arr.indexOf(""),1);

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

// chapter show
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

// edit chapter
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

//delete chapter
router.get("/chapter/delete/:id", (req,res)=>{
    Chapters.findByIdAndDelete(req.params.id)
    .then(()=>{
        res.redirect("/")
    })
    .catch(err => {
        console.log(err);
    })
})

router.get("/testchapter" , (req,res)=>{

    Chapters.find({},{number:1,manga_id:1,  createdAt:1}).sort({_id:-1}).limit(4).populate({path: "manga_id" , select:["title" , "poster" ]})
    .then((chapter)=>{
        console.log("this is chapter")
         console.log(chapter);
  
         let result = [];
         //console.log(chapter[0].manga_id.title)
        for (let i= 0; i < chapter.length; i++) {
          //  let x =  chapter.splice(i,1);
          let arr = [];
         let x =  chapter[i];
         console.log("title")
         console.log(x.manga_id.title)
          arr.push({chapter_id:x._id , chapter_number:x.number, manga_title:x.manga_id.title,
             manga_poster:x.manga_id.poster, createAt:x.createdAt});
             chapter.splice(i,1);
    
    
          for(let j=0; j<chapter.length;j++){ 
    
            if(arr[i].manga_title == chapter[j].manga_id.title){
                 x =  chapter[j];
                arr.push({chapter_id:x._id , chapter_number:x.number, manga_title:x.manga_id.title,
                   manga_poster:x.manga_id.poster, createAt:x.createdAt});
                   chapter.splice(j,1);
            }
        }
        console.log("this arr")
        console.log(arr)
        result.push(arr);
   
        }  
    })
})

  
  module.exports = router;

