const express = require("express");
const router = express.Router();
const methodOverride = require('method-override');
var mongoose = require('mongoose');

// imoprt Model
const Manga = require("../models/Manga");
const Chapters = require("../models/Chapter");


const isLoggedIn = require("../helper/isLoggedin");
const { request } = require("express");

// Grab the form data
router.use(express.urlencoded({ extended: true }));

router.use(methodOverride('_method'));

// TODO1: add manga
// TODO2: show manga by id
// TODO3: edit manga by id
// TODO4: delete manga by id
// TODO5: show all manga


// TODO1
router.get('/manga/add', isLoggedIn,(req, res) => {
    res.render('manga/add')
})

//post the data
router.post('/manga/add', isLoggedIn,(req, res) => {
    let genres = req.body.genres.split(',');
    let other_names =req.body.other_names.split(',');
    for (let i = 0; i < genres.length; i++) {
        genres[i]=genres[i].trim();
    }
    for (let i = 0; i < other_names.length; i++) {
        other_names[i]=other_names[i].trim();
    }
    req.body.genres = genres;
    req.body.other_names = other_names;
    req.body.title = req.body.title.trim();
    req.body.author = req.body.author.trim();
    req.body.poster = req.body.poster.trim();
    req.body.artists = req.body.artists.trim();
    console.log(req.body.user_id)
    var id = mongoose.Types.ObjectId(req.body.user_id.trim());
    req.body.user_id=id;
    let manga =  new Manga(req.body);
   // console.log(req.body);
   Manga.countDocuments({
    title: manga.title
  })
  .then((count) => {
    if (count > 0) {
      //throw new Error("manga is already exists!!")
      //req.flash("error", "username already exists!!");
      console.log("manga is already exists!!")
        res.redirect('/manga/add')
    }else{
        manga.save()
     .then((m)=>{
      console.log("done")
      res.redirect('/manga/show/'+m._id);
  })
     .catch((err)=>{
      console.log(err);
      res.send(err);
  })
    }
//     console.log(" INCOUNT ")
  });


    
    
 })

//////////////////////////////////////////////
// TODO2
// show
router.get('/manga/show/:id', (req, res) => {
    console.log(req.params.id);
    let manga_id=req.params.id;
    Manga.findById(manga_id)
        .then((m) => {
            Chapters.find({manga_id:manga_id})
           .then((chapters)=>{
            console.log(chapters)
            res.render("manga/show", { m , chapters })
            console.log("done")
           })
           .catch(err=>console.log(err))
        })
        .catch((err) => {
            console.log(err);
            res.send("Error");
        })

})


//////////////////////////////////////////////
// TODO3
// edit 
router.get('/manga/edit/:id', (req, res) => {
    Manga.findById(req.params.id)
        .then((m) => {
            console.log(m)
            console.log("edit done");
            // res.render("manga/edit", { m })
            res.render("manga/edit",{m});
        })
        .catch((err) => {
            console.log(err);
            res.send("Error");
        })
    
})

router.put("/manga/edit/", (req, res) => {
    
    let genres = req.body.genres.split(',');
    let other_names =req.body.other_names.split(',');
    req.body.genres = genres;
    req.body.other_names = other_names;
    const newData = {
        title : req.body.title,
        author : req.body.author,
        other_names : req.body.other_names,
        genres : req.body.genres,
        poster : req.body.poster,
        reading_direction : req.body.reading_direction,
        origin : req.body.origin,
        artists : req.body. artists,
        description : req.body. description,
        manga_id : req.body.user_id,  
    }

     var id = req.query.id;
    Manga.findByIdAndUpdate({_id : id} , {$set : newData})
    .then((m)=>{
        res.redirect("/manga/show/"+id);
    })
    .catch(err => console.log(err))
       
})


//////////////////////////////////////////////
// TODO4

// router.delete("/manga/delete/", (req, res) => {
// })


//////////////////////////////////////////////
// TODO5
// router.get("/manga/allmanga/", (req, res) => {
// })

//Add All Manga

router.get('/allmanga',(req,res)=>{
    Manga.find()
    .then((manga) => {
        console.log(manga)
        res.render("manga/allManga",{manga});
    })
    .catch((err) => {
        console.log(err);
       
    })
    
})






module.exports = router;



