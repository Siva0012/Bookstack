const mongoose = require('mongoose')

const bannerSchema = new mongoose.Schema(
    {
        
        title : {
            type : String
        },
        description : {
            type : String
        },
        active : {
            type : Boolean,
            default : true
        },
        image : {
            type : String,
        },
        public_id : {
            type : String
        },
        createdAt : {
            type : Date,
            default : Date.now()
        },
        updatedAt : {
            type : Date,
            default : Date.now()
        }
    }
)

module.exports = mongoose.model("Banners" , bannerSchema)