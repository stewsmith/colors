/**
 * Module dependencies.
 */
var express = require('express');
    routes = require('./routes'),
    user = require('./routes/user'),
    http = require('http'),
    path = require('path'),
    app = express(),
    server = http.createServer(app),
    io = require('socket.io').listen(server);

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

server.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});

app.get('/', routes.index);
app.get('/collector', routes.collector);
app.get('/user', routes.user);

var rooms = {};

io.sockets.on('connection', function(socket) {
  //user scrolled, send rgb to teacher
  socket.on('scoreChange', function(obj) {
    var sessionId = obj.sessionId;
    socket.broadcast.to(sessionId).emit('rgb', obj);
  });
  // Set Session ID
  socket.on('create', function(sessionId) {
    if(socket.join(sessionId)) {
      rooms[sessionId] = {};
      rooms[sessionId]['studentCount'] = 0;
    }
  });
  // Increment user count
  socket.on('userJoin', function(sessionId) {
    if (socket.join(sessionId)) {
      if (rooms[sessionId]) {
        rooms[sessionId]['studentCount']++;
        socket.studentId = rooms[sessionId]['studentCount'];
        socket.sessionId = sessionId;
        socket.emit('ham', rooms[sessionId]['studentCount']);
        socket.broadcast.to(sessionId).emit('createStudent', rooms[sessionId]['studentCount']);
      }
    }
  });
  socket.on('disconnect', function() {
    if (rooms[socket.sessionId]) {
      rooms[socket.sessionId]['studentCount']--;
      socket.broadcast.emit('studentDisconnect', { studentId: socket.studentId, studentCount: rooms[socket.sessionId]['studentCount']} );
    }
  });
});
