const mongoose = require('mongoose');

const RequestSchema = mongoose.Schema({
    user_id :{
        type:mongoose.Schema.Types.ObjectId , 
        ref : 'User',
    },
    description: {

        type: String,
        require: true,
    }

}, {
    timestamps: true // means createdAt and updatedAt
});

const Request = mongoose.model("Request", RequestSchema);

module.exports = Request;