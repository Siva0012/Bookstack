const express = require('express')
const cors = require('cors')
const {connectToDatabase} = require('./config/mongoose')
const app = express()
const {updateExpiredCheckoutStatus} = require('./utils/checkout_status_updator')
const {updateFines} = require('./utils/fine_updator')
const {preferenceUpdater} = require('./utils/preference_updater')

//connect to database
connectToDatabase()

//update functions
updateFines()
updateExpiredCheckoutStatus()
preferenceUpdater()

//routes
const member_router = require('./routes/member_routes.js')
const adimn_router = require('./routes/admin_routes.js')
const chat_router = require('./routes/chat_routes.js')
const message_router = require('./routes/message_router')

//express parsers
app.use(express.json())
app.use(express.urlencoded({extended : true}))

//cors
app.use(cors(
    {
        origin : ['http://localhost:5173'], //env
        methods : ["GET" , "POST" , "PATCH"],
        credentials : true
    }
))

//mounting routes to the application
app.use('/' , member_router)
app.use('/admin' , adimn_router)
app.use('/chat' , chat_router)
app.use('/message' , message_router)

app.listen(3000 , () =>{
    console.log("server has started at port 3000");
})