const express = require('express');
const app = express();
const socket = require('socket.io');
const server = require('http').Server(app);
const io = socket();
io.attach(server);

app.use(express.static('dist'));
server.listen(3000);

var id = 1;

io.on('connection', function(socket) {
  console.log('connected');
  var label = id++;
  socket.on('datain', function(coords) {
    console.log(coords);
    coords.label = id;
    socket.broadcast.emit('dataout', coords);
  })
});
