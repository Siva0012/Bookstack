const Chats  = require('../models/chat_model')
const Admins = require('../models/admin_model')

const createChat = async (req , res , next) => {
      // const {senderId , receiverId} = req.body
      const {senderId} = req.body
      const adminData = await Admins.find({})
      const receiverId = adminData[0]._id.toString()
      const newChat = new Chats(
            {
                  members : [senderId , receiverId]
            }
      )
      
      try{
            const result = await newChat.save()
            if(result) {
                  res.status (200).json({message : "new chat created" , result : result})
            } else {
                  res.status(404).json({error : "Failed to create chat"})
            }
      }catch(err) {
            res.status(500).json({error : "Internal server Error"})
      }
}

const getChat = async (req , res , next) => {
      try {
            const userId = req.params.userId
            const chat = await Chats.find(
                  {
                        members : {$in : [userId]}
                  }
            ).sort({updatedAt : -1})
            if(chat) {
                  res.status(200).json({message : "user chat" , chat : chat} )
            } else {
                  res.status(404).json({error : "No chat history" , chat : false})
            }
      }catch(error) {
            res.status(500).json({error : "Internal server Error"})
      }
}

const findChat = async (req , res , next) => {
      try{
            const firstId = req.params.firstId
            const secondId = req.params.secondId

            const chat = await Chats.findOne(
                  {
                        members : {$all : [firstId , secondId]}
                  }
            )
            if(chat) {
                  res.status(200).json({message : "Personal chat" , chat : chat})
            }
      } catch(error) {
            res.status(500).json({error : "Internal server Error"})
      }
}

module.exports = {
      createChat,
      getChat,
      findChat
}