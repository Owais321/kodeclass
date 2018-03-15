const express=require('express');
let socket=require('socket.io')
const app=express();
let server=app.listen(3000,function(){
    console.log('listening');
});
//static files
app.use(express.static('public'));
var io=socket(server);
var socks = [];
var body = "function test(){ \n console.log('test'); \n }";
io.sockets.on('connection', function (socket) {
    socket.on('url',function(data){
         io.sockets.emit('url',data)
         console.log(data);
     });
socks.push(socket);
socket.emit('refresh', {body: body});
socket.on('refresh', function (body_) {
console.log('new body');
body = body_;
});
socket.on('change', function (op) {
console.log(op);
if (op.origin == '+input' || op.origin == 'paste' || op.origin == '+delete') {
  socks.forEach(function (sock) {
    if (sock != socket)
      sock.emit('change', op);
});
};
});
});