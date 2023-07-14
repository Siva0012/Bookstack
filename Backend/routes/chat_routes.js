const express = require('express')
const chat_router = express.Router()

const chatController = require('../controllers/chat_controller')

chat_router.post('/create' , chatController.createChat)
chat_router.get('/get-chat/:userId', chatController.getChat)
chat_router.get('/find/:firstId/:secondId' , chatController.findChat)

module.exports = chat_router