require('dotenv').config();
const express = require('express');
const http = require('http');
const cors = require('cors');
const socketio = require('socket.io');
const socket = require('./src/socket/websocket.js');

// App Settings
const PORT = process.env.SERVER_PORT || 8000; // Define Server port
const app = express();
const server = http.createServer(app);
app.use(cors());



const connection = socketio(server, { //Define Socket Server 
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
    }
});

socket(connection);


server.listen(PORT, () => `Server is running on port ${PORT}`);