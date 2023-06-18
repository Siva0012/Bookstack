const mongoose = require('mongoose')

const memberSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    phone : {
        type : String,
        required : false
    },
    password : {
        type : String,
        required : true
    },
    dateOfJoin : {
        type : Date,
        default : Date.now()
    },
    membershipId : {
        type : String,
    },
    membershipType : {
        type : String,
    },
    isBlocked : {
        type : Boolean,
        default : false
    },
    isMember : {
        type : Boolean,
        default : false
    },
    profilePicture : {
        type : String,
    }

})

module.exports = mongoose.model("Members" , memberSchema)