const cron = require('node-cron')
const Books = require('../models/book_model')
const Reservations = require('../models/reservation_model')

const preferenceUpdater = async () => {
      try{
            console.log("preference /// updater");
            const reservedBooks = await Books.aggregate([
                  { $match: { reservationOrder: { $exists: true } } },
                  { $match: { $expr: { $gte: [{ $size: '$reservationOrder' }, '$maxReservations'] } } } //finding docs having reservation order gte max reservation
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

cron.schedule('* * * * *' , preferenceUpdater)
module.exports = {preferenceUpdater}