var express = require('express');
const socketIO = require('socket.io');
const http = require('http');
var app = express();
const path = require('path');
const publicPath = path.join(__dirname,'../public');
var server = http.createServer(app);
var io = socketIO(server);
const port = process.env.PORT || 3000 ;
const {generateMessage} = require('./utils/message');
const {generateLocationMessage} = require('./utils/locationMessage');

app.use(express.static(publicPath));

io.on('connection',(socket)=>{
  console.log('New user Connected!');
  socket.emit('newMessage',generateMessage('Admin','Welcome to the Chat app'));
  socket.broadcast.emit('newMessage',generateMessage('Admin','New user joined'));

  socket.on('createMessage',(message,callback)=>{
    console.log('Created Message ',message);
    io.emit('newMessage',generateMessage(message.from,message.text));
    callback();

  });
  socket.on('createLocationMessage',(coords)=>{
    io.emit('newLocationMessage',generateLocationMessage('Admin',coords.latitude , coords.longitude))
  });

  socket.on('disconnect',()=>{
    console.log('Disconnected!');
  });
});

server.listen(port,()=>{
  console.log(`Socket IO is running in ${port}`);
});
