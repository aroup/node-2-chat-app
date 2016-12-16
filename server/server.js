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
const {isRealString}= require('./utils/validation');
const {Users} = require('./utils/users');
app.use(express.static(publicPath));
var users=new Users();

io.on('connection',(socket)=>{
  console.log('New user Connected!');
  socket.on('join',(params,callback)=>{
    if(!isRealString(params.name) || !isRealString(params.room)){
      return callback('Name and Room name are required');
    }
    socket.join(params.room);
    users.removeUser(socket.id);
    users.addUser(socket.id,params.name,params.room);
    io.to(params.room).emit('updateUserList',users.getUserList(params.room));
    //io.emit -> connects to everysingle connected user
    //socket.broadcast.emit-> message to everyone connected except current user
    //socket.emit -> emits message to a single user

    socket.emit('newMessage',generateMessage('Admin','Welcome to the Chat app'));
    socket.broadcast.to(params.room).emit('newMessage',generateMessage('Admin',`${params.name} joined`));
    callback();
  });

  socket.on('createMessage',(message,callback)=>{
    var user = users.getUser(socket.id);
    if(user && isRealString(message.text)){
      io.to(user.room).emit('newMessage',generateMessage(user.name,message.text));
    }
    callback();
  });

  socket.on('createLocationMessage',(coords)=>{
    var user=users.getUser(socket.id);
    if(user){
        io.to(user.room).emit('newLocationMessage',generateLocationMessage(user.name,coords.latitude , coords.longitude));
    };
  });

  socket.on('disconnect',()=>{
    var user = users.removeUser(socket.id);
    if(user){
      io.to(user.room).emit('updateUserList',users.getUserList(user.room));
      io.to(user.room).emit('newMessage',generateMessage('Admin',`${user.name} has left`));
    }
  });
});

server.listen(port,()=>{
  console.log(`Socket IO is running in ${port}`);
});
