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
        url : {
            type : String
        },
        image : {
            type : String,
        },
        publicId : {
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