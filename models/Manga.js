const mongoose = require("mongoose");

const MangaSchema = mongoose.Schema({

    title :{
        type : String,
        required : true,
    },

    author :{
        type : String,
        required : true,  
    },

    genres :{
        type : String,
        required : true,  
    },

    other_names :{
        type : Array,
        required : true,  
    },

    rating :{
        type : Number,
        required : true,  
    },

    reading_diriction :{
        type : String,
        required : true,  
    },

    origin :{
        type : String,
        required : true,  
    },

    artisst :{
        type : String,
        required : true,  
    },

    description :{
        type : String,
        required : true,  
    },

},

{ 
    timestamps : true

});



const Manga  = mongoose.model("Manga" , MangaSchema);

module.exports = Manga;
