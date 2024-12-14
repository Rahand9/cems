const { io } = require('socket.io-client');

console.log('Attempting to connect...');

const socket = io('http://localhost:5001'); // Ensure the port matches your backend

socket.on('connect', () => {
    console.log('Connected to server:', socket.id);
    socket.emit('sendMessage', 'Hello from test script');
});

socket.on('connect_error', (err) => {
    console.error('Connection error:', err.message);
});

socket.on('message', (msg) => {
    console.log('Message received from server:', msg);
});

socket.on('disconnect', () => {
    console.log('Disconnected from server');
});
