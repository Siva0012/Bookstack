const mongoose = require('mongoose')

const adminSchema = new mongoose.Schema({
    email : {
        type : String,
        required : true
    },
    name : {
        type : String,
    },
    password : {
        type : String,
        required : true
    }
})

module.exports = mongoose.model("Admin" , adminSchema)