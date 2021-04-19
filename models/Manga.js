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

    poster :{
        type : String,
        required : true,  
    },

    genres :{
        type : Array,
        required : true,  
    },

    other_names :{
        type : Array,
        required : true,  
    },

    rating :{
        type : Number,
    },

    reading_direction :{
        type : String,
        required : true,  
    },

    origin :{
        type : String,
        required : true,  
    },

    artists :{
        type : String,
        required : true,  
    },

    description :{
        type : String,
        required : true,  
    },
    user_id :{
        type: mongoose.Schema.Types.ObjectId , 
        ref : 'User'
    },

},

{ 
    timestamps : true

});



const Manga  = mongoose.model("Manga" , MangaSchema);

module.exports = Manga;
