const cron = require('node-cron')

const lenderHistory = require('../models/lender_history')
const Members = require('../models/member_model');
const { findById } = require('../models/admin_model');

const updateFines = async () => {

     try {
          // console.log("update fine function //////////////");
          const allCheckouts = await lenderHistory.find({}).populate('member').populate('book')
          if (allCheckouts) {
               //creating set for members with fine
               const memberWithFine = new Set()
               for (const checkout of allCheckouts) {
                    //calculating fine amount
                    const fineAmount = checkout.calculateFine()
                    // console.log(fineAmount, "for" , checkout.book.title);
                    //adding members to the set if there is fine
                    if (fineAmount > 0) {
                         if (!memberWithFine.has(checkout.member._id)) {
                              memberWithFine.add(checkout.member._id)
                         }
                         //change the fine paid status to false
                         checkout.hasFinePaid = false
                         checkout.fineAmount = fineAmount
                         await checkout.save()
                    }
               }
               //seting fine status for members inside the set
               if (memberWithFine.size) {
                    for (const memberId of memberWithFine) {
                         const memberUpdate = await Members.findByIdAndUpdate(memberId, { $set: { hasFinePaid: false } })
                    }
               } else {
                    //setting default value true for those who don't have any fine.
                    const membersUpdate = await Members.updateMany({ hasFinePaid: true })
               }

               //finding active checkouts
               const activeCheckouts = await lenderHistory.find({$or : [{status : "Borrowed"} , {status : "Approved"}]})

               //cumulative fine for the member
               const members = await Members.find({})
               for (const member of members) {
                    const memberId = member._id
                    const totalFineAmount = activeCheckouts
                         .filter((checkout) => checkout.member._id.toString() === memberId.toString())
                         .reduce((total, checkout) => total + checkout.fineAmount, 0)
                    await Members.findOneAndUpdate(memberId, { totalFineAmount })
               }

          }


     } catch (err) {
          console.log(err.message);
     }

}

cron.schedule('* * * * *', updateFines)

module.exports = { updateFines }