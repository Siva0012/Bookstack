const mongoose = require('mongoose')

const reservationShema = new mongoose.Schema(
      {
            memberId : {
                  type : mongoose.Schema.Types.ObjectId,
                  ref : 'Members',
                  required : true
            },
            bookId : {
                  type : mongoose.Schema.Types.ObjectId,
                  ref : "Books",
                  required : true
            },
            reservedOn : {
                  type : Date,
            },
            notification : {
                  hasNotified : {
                        type : Boolean,
                        default : false
                  },
                  notifiedOn : {
                        type : Date,
                  }
            }
      }
)

module.exports = mongoose.model('Reservations' , reservationShema)