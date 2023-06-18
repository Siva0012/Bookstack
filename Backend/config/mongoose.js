const mongoose = require('mongoose')
require('dotenv').config()


const connectToDatabase = () =>{
    const url = process.env.MONGODB_URI
    mongoose.connect(url , 
        {
            useNewUrlParser : true,
            useUnifiedTopology : true
        }
    ).then(() =>{
        console.log("Connected to Bookstock");
    }).catch(err => console.log("Error connecting to server" + err))
}

module.exports = {connectToDatabase}