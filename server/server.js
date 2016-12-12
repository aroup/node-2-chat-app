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
  socket.on('disconnect',()=>{
    console.log('Disconnected!');
  })
});

server.listen(port,()=>{
  console.log(`Socket IO is running in ${port}`);
});
