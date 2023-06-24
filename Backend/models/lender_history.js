const mongoose = require('mongoose')

const lenderHistorySchema = new mongoose.Schema({
     member : {
          type : mongoose.Schema.Types.ObjectId,
          ref : 'Members',
          required : true
     },
     book : {
          type : mongoose.Schema.Types.ObjectId,
          ref : 'Books',
          required : true
     },
     checkoutDate : {
          type : Date,
          required : true
     },
     dueDate : {
          type : Date,
          required : true
     },
     returnDate : {
          type : Date,
          required : true
     },
     fineAmount : {
          type : Number,
          default : 0
     },
     status : {
          type : String,
          enum : ['Borrowed' , 'Returned'],
          default : 'Borrowed'
     }
})

module.exports = mongoose.model('LenderHistory' , lenderHistorySchema )