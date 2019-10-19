
const socket = io()

let params = new URLSearchParams(window.location.search);

if(!params.has('user') || !params.has('room')){
    window.location = 'index.html';
    throw new Error('User and room are required');
}

let user = {
    name: params.get('user'),
    room: params.get('room')
}

socket.on('connect', function(){
})

socket.on('userConnection', function(data){
    console.log(data.message);
})

socket.emit('enterChat', user, function(data){
    console.log('Connected users', data);
})


socket.on('disconnect', function(){
})

socket.on('userDisconnection', function(data){
    console.log(data.message);
})


socket.on('usersConnected', function(data){
    console.log('Users connected', data);
})


socket.on('newMessage', function(data){
    console.log(data);
})


// private messages
socket.on('privateMessage', function(data){
    console.log(data);
})







