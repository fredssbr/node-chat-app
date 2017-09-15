const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

/**
 * To reach the public folder, this way would enter the server folder 
 * (since __dirname is the directory of the file we use it) and then 
 * come out of it
 */
//console.log(__dirname + '/../public');
const publicPath = path.join(__dirname, '../public');
/**
 * PATH normalizes it
 */
//console.log(publicPath);

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

    socket.on('createMessage', (newMessage) => {
        console.log('createMessage', newMessage);
        //Emits an event to all connections
        io.emit('newMessage', {
            from: newMessage.from,
            text: newMessage.text,
            createdAt: new Date().getTime()
        });
    });

});

server.listen(port, () =>{
    console.log(`Server is running on port ${port}`);
});