var express = require('express');
const socketIO = require('socket.io');
const http = require('http');
var app = express();
const path = require('path');
const publicPath = path.join(__dirname,'../public');
var server = http.createServer(app);
var io = socketIO(server);
const port = process.env.PORT || 3000 ;

app.use(express.static(publicPath));

io.on('connection',(socket)=>{
  console.log('New user Connected!');

  // socket.emit('newEmail',{
  //   from : 'mike@example.com',
  //   text : 'Hey what is going on?',
  //   createdAt : 123
  // });
  socket.emit('newMessage',{
    from : 'admin',
    text : 'Welcome to the Chat App',
    createdAt : new Date().getTime()
  });

  socket.broadcast.emit('newMessage',{
    from : 'admin',
    text : 'New user Joined',
    createdAt : new Date().getTime()
  });

  socket.emit('newMessage',{
    from : 'mike@example.com',
    text : 'Hey whats going on?',
    createdAt : '25/6/12'
  });

  // socket.on('createEmail',(newEmail)=>{
  //   console.log('createEmail',newEmail);
  // });

  socket.on('createMessage',(message)=>{
    console.log('Created Message ',message);
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
