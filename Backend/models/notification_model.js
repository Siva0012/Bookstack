const mongoose = require('mongoose')

const notificationSchema = new mongoose.Schema(
      {
            notificationType : {
                  type : String,
                  required : true
            },
            notificationDate : {
                  type : Date,
                  default : new Date()
            },
            message : {
                  type : String,
                  required : true
            },
            member : {
                  type : mongoose.Schema.Types.ObjectId,
                  ref : "Members",
                  required : true
            }
      }
)

module.exports = mongoose.model('Notifications' , notificationSchema)