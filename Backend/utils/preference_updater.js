const cron = require('node-cron')
const Books = require('../models/book_model')
const Reservations = require('../models/reservation_model')

const preferenceUpdater = async () => {
      try{
            const reservedBooks = await Books.aggregate([
                  { $match: { reservationOrder: { $exists: true } } },
                  { $match: { $expr: { $gte: [{ $size: '$reservationOrder' }, '$maxReservations'] } } }
                ])
            // const reservedBooks = await Books.find({ $expr: { $gte: [{ $size: '$reservationOrder' }, '$maxReservations'] } })
            // console.log("reservedBookss" , reservedBooks);
            if(reservedBooks) {
                  reservedBooks.forEach(async (bookData , i) => {
                        // console.log("preference updater");
                        const reservationId = bookData.reservationOrder[0].reservation
                        const reservationData = await Reservations.findById(reservationId)
                        const memberId = reservationData.memberId
                        // console.log(memberId , i);
                        await Books.findByIdAndUpdate(bookData._id , {$set : {nextCheckoutBy : memberId}})
                  })
            }
      }catch(err) {
            console.log(err);
      }
}

cron.schedule('*/30 * * * * *' , preferenceUpdater)
module.exports = {preferenceUpdater}