const { io } = require('../server')
const UserManager = require('../classes/user-manager')
const { createMessage } = require('../utils/messages')


const userManager = new UserManager();

io.on('connection', (socket) => {

    socket.on('enterChat', (data, callback) => {

        if (!data.name || !data.room) {
            return callback({
                err: true,
                message: 'Name/Room are required'
            })
        }

        // Join user to room
        socket.join(data.room);

        let users = userManager.addUser(socket.id, data.name, data.room);

        callback(userManager.getUsersByRoom(data.room))

        socket.broadcast.to(data.room).emit('userConnection', {
            message: `${data.name} has joined the room`
        })

        socket.broadcast.to(data.room).emit('usersConnected', userManager.getUsersByRoom(data.room));

    });

    socket.on('newMessage', (data) => {
        let user = userManager.getUser(socket.id);
        socket.broadcast.to(user.room).emit('newMessage', createMessage(user.name, data.message));
    })

    socket.on('disconnect', () => {
        let disconnectedUser = userManager.deleteUser(socket.id);

        if (disconnectedUser) {
            socket.broadcast.to(disconnectedUser.room).emit('userDisconnection', {
                message: `${disconnectedUser.name} has left the room`
            })

            socket.broadcast.to(disconnectedUser.room).emit('usersConnected', userManager.getUsersByRoom(disconnectedUser.room));
        }
    })

    // Private messages
    socket.on('privateMessage', (data) => {

        let user = userManager.getUser(socket.id);
        socket.broadcast.to(data.to).emit('privateMessage', createMessage(user.name, data.message));
    })

})
