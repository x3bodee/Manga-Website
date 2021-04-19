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
    req.body.genres = genres;
    req.body.other_names = other_names;
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
     .then(()=>{
      console.log("done")
      res.redirect('/');
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
    Manga.findById(req.params.id)
        .then((m) => {
            console.log(m)
            res.render("manga/show", { m })
            console.log("done")
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


module.exports = router;



