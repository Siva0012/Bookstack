const Messages = require('../models/message_model')

const addMessage = async (req , res , next) => {
      try{
            const {chatId , senderId ,text} = req.body
            const message = new Messages(
                  {
                        chatId : chatId,
                        senderId : senderId,
                        text : text
                  }
            )
            const result = await message.save()
            if(result) {
                  res.status(200).json({message : "Added Message" , result : result})
            } else {
                  res.status(404).json({error : "Failed to send message"})
            }
      }catch(err) {
            res.status(500).json({error : "Internal server Error"})
      }
}

const getMessages = async (req , res , next) => {
      try{
            const {chatId} = req.params
            const result = await Messages.find({chatId : chatId})
            if(result) {
                  res.status(200).json({message : "Messages" , result : result})
            } else {
                  res.status(404).json({error : "Failed to fetch messages"})
            }
      }catch(err) {
            res.status(500).json({error : "Internal server Error"})
      }
}

module.exports = {
      addMessage,
      getMessages
}