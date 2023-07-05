const mongoose = require('mongoose')

const tokenSchema = new mongoose.Schema({
     memberId : {
          type : mongoose.Schema.Types.ObjectId,
          required : true,
          ref : 'Members',
          unique : true
     },
     token : {
          type : String,
          required : true
     },
     createdAt : {
          type : Date,
          default : Date.now(),
          expires : 3600
     }

})

module.exports = mongoose.model('Tokens' , tokenSchema)