const express = require('express');
let socket = require('socket.io')
let fs = require('fs');
const app = express();
const url='urldefined'
app.post('localhost:3000',(req,res,next)=>{
    console.log(res);
});
let server = app.listen(process.env.PORT || 3000, function () {
    console.log('listening');
});
app.get('/test',(req,res)=>{
    res.sendFile(__dirname+'/public/files/work.html')
})
//static files
app.use(express.static('public'));
var io = socket(server);
var socks = [];
var body = "function test(){ \n console.log('test'); \n }";
io.sockets.on('connection', function (socket) {
    socket.on('url', function (data) {
        io.sockets.emit('url', data)
        console.log(data);
    });
    socket.on('code', function (data) {
        console.log(data);
        fs.writeFile('./public/files/work.html', data.code, function (err, data) {
            if (err) console.log(err);
            console.log("Successfully Written to File.");
            io.sockets.emit('code', data);
        });
    });
    socks.push(socket);
    socket.emit('refresh', { body: body });
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