var socket = io();
socket.on('connect',function (){
  console.log('connected to server!');
  // socket.emit('createEmail',{
  //   to : 'Jen@examle.com',
  //   text : 'Hey it is Andrew'
  // });
});

socket.on('newMessage',function(message){
  console.log('new message ',message);
});

socket.on('disconnect',function(){
  console.log('disconnected!');
});

// socket.on('newEmail',function(email){
//   console.log('new email',email);
// });
