const mongoose = require('mongoose');

const favoriteSchema = mongoose.Schema({
    user_id: {
        type : mongoose.Schema.Types.ObjectId , 
        ref : 'User'
    },
    manga_id: {
        type : mongoose.Schema.Types.ObjectId , 
        ref : 'Manga'
    }
},
{
    timestamps: true // means createdAt and updatedAt
});

const Favorite = mongoose.model("Favorite", favoriteSchema);

module.exports = Favorite;