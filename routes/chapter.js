const express = require("express");
const router = express.Router();
const methodOverride = require('method-override');
var mongoose = require('mongoose');
const moment = require('moment');
// imoprt Model
const Chapters = require("../models/Chapter");
const Manga = require("../models/Manga");

const isLoggedIn = require("../helper/isLoggedin");
const canEdit = require("../helper/canEdit");
const canDelete = require("../helper/canDelete");

// Grab the form data
router.use(express.urlencoded({extended : true}));

router.use(methodOverride('_method'));


// load the add chapter form 
router.get('/chapter/add/:id' , canEdit ,(req ,res ) => {
     
    var manga_id = req.params.id;
    var user_id =  req.user._id;
    console.log(req.params.id)
    res.render('chapter/add' , {manga_id , user_id})
  })

  // post the data
  router.post('/chapter/add' , canEdit ,(req ,res ) => {
    
  let chapterLinks = req.body.pages;
  req.body.title=req.body.title.trim();
  console.log("chapter links: "+chapterLinks);
   let arr = chapterLinks.split('\n');
   if (arr.includes('')) {
       arr.splice(arr.indexOf(""),1);
   }
   for (let i = 0; i < arr.length; i++) {
       arr[i]=arr[i].trim();
    }

   req.body.pages = arr;
  let chapter =  new Chapters(req.body);

   chapter.save()
   .then(()=>{
    res.redirect("/manga/show/"+req.body.manga_id)
    console.log("done")
})
   .catch((err)=>{
    console.log(err);
    res.render("err/index",{err});
})
   
})

// chapter show
router.get('/chapter/show/:id' , (req ,res ) => {
    
   // console.log(req.params.id);
   Chapters.findById(req.params.id)
   .then((chapter)=>{
       //console.log(chapter)
       Chapters.find({manga_id:chapter.manga_id})
       .then((allchapter)=>{
        console.log("all chapter")
        console.log(allchapter)
        allchapter.sort((a, b) => parseFloat(b.number) - parseFloat(a.number));
        res.render("chapter/show" , {chapter,allchapter})
       })
       .catch((err)=>{
        console.log(err);
        res.send("Error");
    })
     
})
   .catch((err)=>{
    console.log(err);
    res.render("err/index",{err});
})
      
})

// edit chapter
router.get('/chapter/edit/:id' , canEdit , (req ,res ) => {
    
    console.log(req.params.id)
    var id = req.user._id;
    Chapters.findById(req.params.id)
    .then((chapter)=>{
       // console.log(chapter)
        res.render("chapter/edit" , {chapter, id})
    })
       .catch((err)=>{
        console.log(err);
        res.render("err/index",{err});
    })
  })



  router.put("/chapter/edit/" , canEdit , (req,res)=>{
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
           res.redirect("/chapter/show/" + req.body.id);
       }
   })

})

//delete chapter
router.get("/chapter/delete/:id", canDelete ,(req,res)=>{
    Chapters.findByIdAndDelete(req.params.id)
    .then(()=>{
        res.redirect("/manga/show")
    })
    .catch(err => {
        console.log(err);
        res.render("err/index",{err});
    })
})

router.get("/" , (req,res)=>{

    //Chapters.find().limit(-2).populate(" manga_id")
    // .sort({_id:-1}).limit(2)

    Manga.find({}).sort({ _id: -1 }).limit(4)
        .then(manga => {
            let main_manga=manga;
            Chapters.find({}, { number: 1, manga_id: 1, createdAt: 1 }).sort({ _id: -1 }).limit(50).populate({ path: "manga_id", select: ["title", "poster"] })
                .then((chapter) => {
                    chapter.forEach((ch) => {
                        Object.assign(ch, { flag: false });
                    });

                    // console.log("print all chapters")
                    //console.log(chapter);
                    let result = [];
                    // 1 1 2 1 2 3 1 3
                    //console.log("---------------------------------------------------")
                    // sort
                    chapter.forEach((ch, i) => {
                        if (ch.flag == false) {
                            let arr = [];
                            let x = ch;
                            arr.push({
                                chapter_id: x._id, chapter_number: x.number, manga_title: x.manga_id.title,
                                manga_poster: x.manga_id.poster, createAt: x.createdAt
                            });

                            ch.flag = true;
                            //console.log("now create "+arr[0].manga_title+" array");
                            for (let j = 0; j < chapter.length; j++) {

                                if (arr[0].manga_title == chapter[j].manga_id.title && chapter[j].flag == false) {
                                    let x = chapter[j];
                                    arr.push({
                                        chapter_id: x._id, chapter_number: x.number, manga_title: x.manga_id.title,
                                        manga_poster: x.manga_id.poster, createAt: x.createdAt
                                    });
                                    //chapter.splice(j,1);
                                    chapter[j].flag = true;
                                }
                            }
                            result.push(arr);
                        }
                    })// end of forEach
                    console.log("----------------------------------------")
                    console.log("print sorted manga chapters")

                    result.forEach((r) => {
                        r.sort((a, b) => parseFloat(b.chapter_number) - parseFloat(a.chapter_number));
                    })

                    let newChapters = [];

                    result.forEach((manga) => {
                        let t = {
                            manga_title: "",
                            manga_poster: "",
                            createAt: "",
                            chapters_number: [],
                            chapters_id: []
                        }
                        manga.forEach((chapter, i) => {
                            if (i == 0) {
                                t.manga_title = chapter.manga_title;
                                t.manga_poster = chapter.manga_poster;
                                t.createAt = chapter.createAt;
                            }
                            t.chapters_number.push(chapter.chapter_number)
                            t.chapters_id.push(chapter.chapter_id)
                        })
                        newChapters.push(t);
                    })
                    console.log("new chapters :")
                    console.log(newChapters)
                    console.log("new manga :")
                    console.log(manga)
                    console.log("Done")

                    res.render("home/home",{newChapters,main_manga});

                })
                .catch(err =>{
                    console.log(err);
                    res.render("err/index",{err});
                });
    })
    .catch(err=>{
        console.log(err);
        res.render("err/index",{err});
    });
    
})

  
  module.exports = router;

