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
  var li = jQuery('<li></li>');
  li.text(`${message.from} : ${message.text}`);

  jQuery('#messages').append(li);
});

socket.on('disconnect',function(){
  console.log('disconnected!');
});


jQuery('#message-form').on('submit',function(e){
  e.preventDefault();
  socket.emit('createMessage',{
    from :'User',
    text : jQuery('[name=message]').val()
  },function(){

  })
});
// socket.on('newEmail',function(email){
//   console.log('new email',email);
// });
