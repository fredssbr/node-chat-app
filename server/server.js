const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const {isRealString} = require('./utils/validation')
const {Users} = require('./utils/users');

/**
 * To reach the public folder, this way would enter the server folder 
 * (since __dirname is the directory of the file we use it) and then 
 * come out of it. PATH normalizes it.
 */
//console.log(__dirname + '/../public');
const publicPath = path.join(__dirname, '../public');
const {generateMessage, generateLocationMessage} = require('./utils/message');

var port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New user connected');

    socket.on('disconnect', () => {
        var user = users.removeUser(socket.id);
        if(user){
            io.to(user.room).emit('updateUserList', users.getUserList(user.room));
            io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left.`));
        }
    });

    socket.on('join', (params, callback) => {
        if(!isRealString(params.name) || !isRealString(params.room)){
            return callback('Name and room name are required');
        }
        //join a room
        socket.join(params.room);
        //leaves the room
        //socket.leave(params.room)
        users.removeUser(socket.id);
        users.addUser(socket.id, params.name, params.room);
        io.to(params.room).emit('updateUserList', users.getUserList(params.room));

        //Send event to everybody connected to that room
        //io.emit -> io.to(params.room).emit

        //Send event to everybody connected to that room except the one calling this
        //socket.broadcast.emit -> socket.broadcast.to(params.room).emit

        //Emits an event to one single connection
        socket.emit('newMessage', generateMessage("Admin", "Welcome to the chat app."));
        
        //Emits event to everybody (every connection) but this socket(myself)
        socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin',`${params.name} has joined.`));

        callback();
    });

    socket.on('createMessage', (newMessage, callback) => {
        var user = users.getUser(socket.id);
        if(user && isRealString(newMessage.text)){
            io.to(user.room).emit('newMessage', generateMessage(user.name, newMessage.text));
        }        
        //Acknowledge function
        callback();
    });

    socket.on('createLocationMessage', (coords) => {
        var user = users.getUser(socket.id);
        if(user){
            io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude));
        }        
    });

});

server.listen(port, () =>{
    console.log(`Server is running on port ${port}`);
});