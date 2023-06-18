const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema(
    {
        name : {
            type : String,
            required : true
        },
        description : {
            type : String,
            required : true
        },
        dateAdded : {
            type : Date,
            default : Date.now()
        }
    }
)

module.exports = mongoose.model("Categories" , categorySchema)