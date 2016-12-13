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

app.use(express.static(publicPath));

io.on('connection',(socket)=>{
  console.log('New user Connected!');

  // socket.emit('newEmail',{
  //   from : 'mike@example.com',
  //   text : 'Hey what is going on?',
  //   createdAt : 123
  // });
  socket.emit('newMessage',generateMessage('admin','Welcome to the Chat app'));
  socket.broadcast.emit('newMessage',generateMessage('admin','New user joined'));

  // socket.on('createEmail',(newEmail)=>{
  //   console.log('createEmail',newEmail);
  // });

  socket.on('createMessage',(message)=>{
    console.log('Created Message ',message);
    io.emit('newMessage',generateMessage(message.from,message.text));
    // io.emit('newMessage',{
    //   from : message.from,
    //   text : message.text,
    //   createdAt : new Date().getTime()
    // });
    // socket.broadcast.emit('newMessage',{
    //   from : message.from,
    //   text : message.text,
    //   createdAt : new Date().getTime()
    // });
  });

  socket.on('disconnect',()=>{
    console.log('Disconnected!');
  });
});

server.listen(port,()=>{
  console.log(`Socket IO is running in ${port}`);
});
