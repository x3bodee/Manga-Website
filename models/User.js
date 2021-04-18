const mongoose = require('mongoose')


const userSchema = mongoose.Schema({

    username: {
        type: String,
        require: true,

    },
    password: {
        type: String,
        rerequire: true,
    },
    email: {
        type: String,
        rerequire: true,
    },
    type: {
        type: String,
        rerequire: true,
    },

}, {
    timestamps: true // means createdAt and updatedAt
});

const User = mongoose.model('User', userSchema)

module.exports = User;