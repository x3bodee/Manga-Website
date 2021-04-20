const mongoose = require('mongoose');
const RequestSchema = mongoose.Schema({
    user_id :{
        type:mongoose.Schema.Types.ObjectId , 
        ref : 'User',
        require: true
    },
    description: {
        type: String,
        require: true,
    },
    isClosed: {
        type: Boolean,
        require: true,
    },
    status: {
        type: Boolean,
    },
    response:{
        type: String,
    }
}, {
    timestamps: true // means createdAt and updatedAt
});
const Request = mongoose.model("Request", RequestSchema);
module.exports = Request;