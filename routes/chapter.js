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

    //Chapters.find().limit(-2).populate(" manga_id")
    // .sort({_id:-1}).limit(2)
    Chapters.find({},{number:1,manga_id:1,  createdAt:1}).sort({_id:-1}).limit(10).populate({path: "manga_id" , select:["title" , "poster" ]})
    .then((chapter)=>{
        chapter.forEach((ch)=>{
            Object.assign(ch, {flag: false});
        });
        
        // console.log("print all chapters")
        //console.log(chapter);
         let result = [];
         //console.log("---------------------------------------------------")
        chapter.forEach((ch,i)=>{
            if(ch.flag == false){
            let arr = [];
            let x =  ch;
            arr.push({chapter_id:x._id , chapter_number:x.number, manga_title:x.manga_id.title,
                manga_poster:x.manga_id.poster, createAt:x.createdAt});
            
            ch.flag=true;
            //console.log("now create "+arr[0].manga_title+" array");
            for(let j=0; j<chapter.length;j++){ 
    
                if(arr[0].manga_title == chapter[j].manga_id.title && chapter[j].flag==false){
                    let x =  chapter[j];
                    arr.push({chapter_id:x._id , chapter_number:x.number, manga_title:x.manga_id.title,
                       manga_poster:x.manga_id.poster, createAt:x.createdAt});
                       //chapter.splice(j,1);
                       chapter[j].flag=true;
                       //console.log("add this "+x.manga_id.title+" chapter to this "+arr[0].manga_title+" manga array");
                }
            }
            //console.log("Manga Chapter for "+arr[0].manga_title);
            //console.log(arr);
            result.push(arr);
        }

        })// end of forEach
        console.log("----------------------------------------")
        console.log("print sorted manga chapters")
        
        result.forEach((r)=>{
            r.sort((a, b) => parseFloat(b.chapter_number) - parseFloat(a.chapter_number));
        })
        console.log(result)
        res.render("/",{result});

    })
    .catch(err=>console.log(err));
})

  
  module.exports = router;

