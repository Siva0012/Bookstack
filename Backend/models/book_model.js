const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema(
    {
        title : {
            type : String,
            required : true
        },
        isAvailable : {
            type : Boolean,
            default : true
        },
        listed : {
            type : Boolean,
            default : true
        },
        author : {
            type : String,
            required : true
        },
        edition : {
            type : String,
            required : true
        },
        category : {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'Categories',
            required : false
        },
        isbn : {
            type : String,
            required : false
        },
        stock : {
            type : Number,
            required : true
        },
        publisher : {
            type : String,
            required : true
        },
        description : {
            type : String,
            required : true
        },
        coverPhoto : {
            type : String,
            requried : false
        },
        publicId : {
            type : String
        },
        dateAdded : {
            type : Date,
            default : Date.now()
        }

    }
)

module.exports = mongoose.model("Books" , bookSchema)