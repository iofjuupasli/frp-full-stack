var http = require('http');

var R = require('ramda');
var add = R.add;
var express = require('express');
var SocketIo = require('socket.io');
var socket = require('most-socket-server');

var app = express();
var server = http.createServer(app);
var io = SocketIo(server);

var value = socket(io).input('/', 'change')
    .scan(add, 0);

socket(io).output('/', 'value')(value);

app.get('/', function (req, res) {
    res.sendfile(__dirname + '/index.html');
});
app.get('/bundle.js', function (req, res) {
    res.sendfile(__dirname + '/bundle.js');
});

server.listen(3000);
