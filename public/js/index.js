var socket = io();

socket.on('connect', function() {
    console.log('Connected to server.');

    socket.emit('createMessage', {
        from: 'Mary',
        text: 'Do not call me that!'
    });
});

socket.on('disconnect', function() {
    console.log('Disconnected from server.');
});

socket.on('newMessage', function(newMessage){
    console.log('newMessage', newMessage);
});