const cron = require('node-cron');
const LenderHistory = require('../models/lender_history');
const Books = require('../models/book_model')
const Notifications = require('../models/notification_model')
const {sendNotificationToUser , getSocketInstance} = require('../config/socket');
const moment = require('moment/moment');

const updateExpiredCheckoutStatus = async () => {
     const currentTime = new Date();
     console.log("status /// updater");
     const date = new Date()
     console.log(moment(date).format("hh:mm:ss"));

     try {

          //finding all the checkouts with status pending and approved and expiresIn less than currentTime(expired requests)
          const expiredRequests = await LenderHistory.find(
               {
                    $or: [{ status: "Pending" }, { status: "Approved" }],
                    expiresIn: { $lte: currentTime }
               }
          )
          if (expiredRequests) {
               for (const request of expiredRequests) {
                    request.hasFinePaid = true
                    request.status = 'Expired';
                    //update the stock of expired books
                    const bookId = request.book
                    const bookData = await Books.findById(bookId)
                    const bookUpdate = await Books.findByIdAndUpdate(
                         bookId,
                         {$inc : {availableStock : +1}}
                    )
                    await request.save();
                    //send notification to user
                    const memberId = request.member
                    const notMessage = `You checkout for "${bookData.title}" has expired !!`
                    const time = new Date()
                    const notification = {
                         notificationType : "Reservation",
                         notificationDate : time,
                         message : notMessage,
                         member : memberId
                     }
                     //saving notification to db
                     const not = new Notifications(notification)
                     await not.save()
                     const io = getSocketInstance()
                     sendNotificationToUser(memberId , notification , io)
               }
          }
          // console.log('Checkout status updater: Updated status for expired requests');
     } catch (error) {
          console.error('Checkout status updater: Error occurred while updating status:', error);
     }
};

cron.schedule('* * * * *', updateExpiredCheckoutStatus);

module.exports = { updateExpiredCheckoutStatus };
