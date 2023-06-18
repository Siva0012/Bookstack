const mongoose = require('mongoose')

const bannerSchema = new mongoose.Schema(
    {
        
        title : {
            type : String
        },
        subTitle : {
            type : String
        },
        image : {
            type : String,
        },
        public_id : {
            type : String
        },
        dateAdded : {
            type : Date,
            default : Date.now()
        }
    }
)

module.exports = mongoose.model("Banners" , bannerSchema)