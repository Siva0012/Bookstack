const express = require('express')
const message_router = express.Router()
const messageController = require('../controllers/message_controller')

message_router.post('/add' , messageController.addMessage)
message_router.get('/:chatId' , messageController.getMessages)



module.exports = message_router