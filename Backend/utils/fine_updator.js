const cron = require('node-cron')

const lenderHistory = require('../models/lender_history')

const updateFines = async () => {
     
     try{
          console.log("update fine function");
          const allCheckouts = await lenderHistory.find({})
          for(const checkout of allCheckouts) {
               const fineAmount = checkout.calculateFine()
                    checkout.fineAmount = fineAmount
                    await checkout.save()
          }

     } catch (err) {
          console.log('fine update error');
     }

}

cron.schedule('* * * * *' , updateFines)

module.exports = {updateFines}