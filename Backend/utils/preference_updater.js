const cron = require('node-cron')
const Books = require('../models/book_model')
const Reservations = require('../models/reservation_model')

const preferenceUpdater = async () => {
      try{
            const reservedBooks = await Books.aggregate([
                  { $match: { reservationOrder: { $exists: true } } },
                  { $match: { $expr: { $gte: [{ $size: '$reservationOrder' }, '$maxReservations'] } } } //finding docs having reservation order gte max reservation
                ])
            // const reservedBooks = await Books.find({ $expr: { $gte: [{ $size: '$reservationOrder' }, '$maxReservations'] } })
            if(reservedBooks) {
                  reservedBooks.forEach(async (bookData , i) => {
                        const reservationId = bookData.reservationOrder[0].reservation
                        const reservationData = await Reservations.findById(reservationId)
                        const memberId = reservationData.memberId
                        await Books.findByIdAndUpdate(bookData._id , {$set : {nextCheckoutBy : memberId}})
                  })
            }
      }catch(err) {
      }
}

cron.schedule('* * * * *' , preferenceUpdater)
module.exports = {preferenceUpdater}