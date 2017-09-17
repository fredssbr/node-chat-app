const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

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

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New user connected');

    socket.on('disconnect', () => {
        console.log('A user has disconnected.');
    });

    //Emits an event to one single connection
    socket.emit('newMessage', generateMessage("Admin", "Welcome to the chat app."));
    
    //Emits event to everybody (every connection) but this socket(myself)
    socket.broadcast.emit('newMessage', generateMessage('Admin','New user joined.'));

    socket.on('createMessage', (newMessage, callback) => {
        console.log('createMessage', newMessage);
        //Emits an event to all connections
        io.emit('newMessage', generateMessage(newMessage.from, newMessage.text));
        //Acknowledge function
        callback('This is from the server.');
    });

    socket.on('createLocationMessage', (coords) => {
        io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
    });

});

server.listen(port, () =>{
    console.log(`Server is running on port ${port}`);
});