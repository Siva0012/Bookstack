const socket = require('socket.io')

let io
let activeUsers = []

const configureSocket = (server) => {

      io = socket(server, {
            cors: {
                  origin: process.env.FRONT_END_URL,
                  methods: ['GET', 'POST', 'PATCH'],
                  credentials: true
            }
      })

      io.on("connection", (socket) => {

            //add new user
            //taking new user Id from client side
            socket.on('add-new-user', (newUserId) => {
                  //if user is not added previously
                  if (!activeUsers.some((user) => user.userId === newUserId)) {
                        activeUsers.push(
                              {
                                    userId: newUserId,
                                    socketId: socket.id
                              }
                        )
                  }
                  console.log("connected users" , activeUsers);
                  io.emit('get-users' , activeUsers)
            })

            //send message
            socket.on("send-message" , (data) => {
                  const {receiverId} = data
                  //getting the user
                  const user = activeUsers.find((user) => user.userId === receiverId)
                  console.log("sending from socket to :" , receiverId);
                  console.log("data" , data);
                  //sending message to the particular user using the socketid 
                  if(user) {
                        console.log("receiver user details" , user);
                        io.to(user.socketId).emit("receive-message" , data)
                  }
            })

            //disconnect
            socket.on("disconnect" , () => {
                  activeUsers = activeUsers.filter((user) => user.socketId !== socket.id)
                  console.log("user disconnected" , activeUsers);
                  io.emit('get-users', activeUsers)
            })
      })

}

const getSocketInstance = () => {
      return io
}

const sendNotificationToUser = (userId , notificationData) => {
      const memberId = userId.toString()
      console.log("active users , memberId" , activeUsers , memberId);
      const user = activeUsers.find((user) => user.userId === memberId)
      console.log("user" , user);
      if(user) {
            const {socketId} = user
            console.log("notification" , notificationData);
            io.to(socketId).emit('receive-notification' , notificationData)
      }
}

module.exports = {configureSocket , getSocketInstance , sendNotificationToUser}