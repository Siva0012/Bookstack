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
     },
     fineAmount : {
          type : Number,
          default : 0
     },
     hasFinePaid : {
          type : Boolean,
          default : false
     },
     status : {
          type : String,
          enum : ['Pending' , 'Approved' , 'Borrowed' , 'Returned' , 'Expired' , 'Fine-paid'],
          default : 'Pending'
     },
     expiresIn : {
          type : Date,
     },
     remarks : {
          type : String
     }
})

lenderHistorySchema.methods.calculateFine = function() {

     if(this.status !== 'Expired' && !this.hasFinePaid) {
          const oneDay = 24 * 60 * 60 * 1000; // Number of milliseconds in a day
          const dueDate = this.dueDate;
          const returnDate = this.returnDate || new Date() // Use current date if returnDate is not set
          const differenceInDays = Math.ceil((returnDate - dueDate) / oneDay);
          return Math.max(differenceInDays * 10 - 10, 0);
     }
     return 0
   };


module.exports = mongoose.model('LenderHistory' , lenderHistorySchema )