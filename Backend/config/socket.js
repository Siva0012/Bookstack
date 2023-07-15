const socket = require('socket.io')

const configureSocket = (server) => {

      const io = socket(server, {
            cors: {
                  origin: process.env.BASE_URL,
                  methods: ['GET', 'POST', 'PATCH'],
                  credentials: true
            }
      })

      let activeUsers = []

      io.on("connection", (socket) => {

            //add new user
            //taking new user Id from client side
            socket.on('new-user-add', (newUserId) => {
                  //if user is not added previously
                  if (activeUsers.some((user) => user.userId === newUserId)) {
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

            //disconnect
            socket.on("disconnect" , () => {
                  activeUsers = activeUsers.filter((user) => user.socketId !== socket.id)
                  console.log("user disconnected" , activeUsers);
                  io.emit('get-users', activeUsers)
            })
      })

}

module.exports = configureSocket