const mongoose = require('mongoose');

const translatorSchema = mongoose.Schema({
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

const Translator = mongoose.model("Translator", translatorSchema);

module.exports = Translator;