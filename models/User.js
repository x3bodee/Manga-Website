const mongoose = require('mongoose')
const bcrypt = require('bcrypt');
const passport = require('passport');

const userSchema = mongoose.Schema({

    username: {
        type: String,
        require: true,

    },
    password: {
        type: String,
        rerequire: true,
    },
    type: {
        type: String,
        rerequire: true,
    },
    email:{
        type: String,
        rerequire: true,
    }

}, {
    timestamps: true // means createdAt and updatedAt
});
userSchema.methods.verifyPassword = function(password){
    return bcrypt.compareSync(password, this.password);
}
const User = mongoose.model('User', userSchema)

module.exports = User;