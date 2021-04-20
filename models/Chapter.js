const mongoose = require("mongoose");

const ChaptersSchema = mongoose.Schema({

    manga_id :{
        type: mongoose.Schema.Types.ObjectId , 
        ref : 'Manga',
        required : true,
    },

    number :{
        type : Number,
        required : true,  
    },

    title :{
        type : String,
        required : true,  
    },

    created_by :{
        type : String,
        required : true,  
    },

    pages :{
        type : Array,
        required : true,  
    },
},

{ 
    timestamps : true

});

const Chapters  = mongoose.model("Chapters" , ChaptersSchema);

module.exports = Chapters;
