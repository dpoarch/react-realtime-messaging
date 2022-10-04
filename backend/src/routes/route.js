const removeUser = require('../service/removeUser.js');

const socket = (connection) => {

      const system = '';
      let instance = '';
      let users = []; // All users in current chat room
      
      
      connection.on('connection', (socket) => { // Start Socket.io Connection
          console.log(socket.id);
      
      
          socket.on('addUser', (data) => { // Add a user to a room
              const {
                  username,
                  room
              } = data;
      
              var timestamp = Date.now(); // Get Current timestamp
      
              socket.join(room); // Join the user to a socket room
      
              socket.to(room).emit('getMessage', { // Send message to all users currently in the room, apart from the user that just joined
                  message: `${username} joined the chat room`,
                  username: system,
                  timestamp,
              });
      
      
      
              socket.emit('getMessage', { // Send welcome msg to user that just joined chat only
                  message: `Welcome ${username}`,
                  username: system,
                  activeUser: users.length,
                  timestamp,
              });
      
      
      
              instance = room; // Save the new user to the room
              users.push({
                  id: socket.id,
                  username,
                  room
              });
              conversation = users.filter((user) => user.room === room);
              socket.to(room).emit('conversations', conversation);
              socket.emit('conversations', conversation);
      
          });
      
          socket.on('sendMessage', (data) => {
              const {
                  message,
                  username,
                  room,
                  timestamp
              } = data;
              connection.in(room).emit('getMessage', data); // Send to all users in room, including sender
          });
      
          socket.on('removeUser', (data) => {
              const {
                  username,
                  room
              } = data;
              let timestamp = Date.now();
      
              socket.leave(room);
      
              users = removeUser(socket.id, users);
              socket.to(room).emit('conversations', users);
              socket.to(room).emit('getMessage', {
                  username: system,
                  message: `${username} left the chat`,
                  timestamp,
              });
          });
      
          socket.on('disconnect', () => {
              const user = users.find((user) => user.id == socket.id);
              if (user?.username) {
                  users = removeUser(socket.id, users);
                  socket.to(instance).emit('conversations', users);
                  socket.to(instance).emit('getMessage', {
                      message: `${user.username} left the chat.`,
                  });
              }
          });
      });
}

module.exports = socket;