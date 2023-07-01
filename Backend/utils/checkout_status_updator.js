const cron = require('node-cron');
const LenderHistory = require('../models/lender_history');

const updateExpiredCheckoutStatus = async () => {
     const currentTime = new Date();

     try {
          // const expiredRequests = await LenderHistory.find({
          //      status: 'Pending',
          //      expiresIn: { $lte: currentTime },
          // });
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
                    await request.save();
               }
          }
          // console.log('Checkout status updater: Updated status for expired requests');
     } catch (error) {
          console.error('Checkout status updater: Error occurred while updating status:', error);
     }
};

cron.schedule('* * * * *', updateExpiredCheckoutStatus);

module.exports = { updateExpiredCheckoutStatus };
