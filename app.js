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
  //user scrolled, update score and average score
  socket.on('scoreChange', function(obj) {
    var score = parseFloat(obj.score, 10);
    var sessionID = obj.sessionID;
    if (rooms[sessionID] && rooms[sessionID][socket.id] >= 0) {
      rooms[sessionID]["total"] -= rooms[sessionID][socket.id];
      rooms[sessionID]["total"] += score;
      rooms[sessionID][socket.id] = score;
      console.log(rooms[sessionID]["total"]);
      console.log("len is " + (Object.keys(rooms[sessionID]).length - 1));
      socket.broadcast.to(sessionID).emit('average', average);
    }
  });
  // Set Session ID
  socket.on('create', function(sessionID) {
    if(socket.join(sessionID)) {
      rooms[sessionID] = {};
      rooms[sessionID]['studentCount'] = 0;
      rooms[sessionID]["total"] = 0;
      console.log("just created room: " + sessionID);
    }
  });
  // Increment user count
  socket.on('userJoin', function(sessionID) {
    if (socket.join(sessionID)) {
      if (rooms[sessionID]) {
        rooms[sessionID]['studentCount']++;
        socket.broadcast.to(sessionID).emit('createStudent', rooms[sessionID]['studentCount']);
        rooms[sessionID][socket.id] = 0;
      }
    }
  });
  socket.on('disconnect', function() {
    for (var room in rooms) {
      var room_obj = rooms[room];
      for (var prop in room_obj) {
        if(room_obj.hasOwnProperty(prop) && prop === socket.id) {
          room_obj.total -= room_obj[prop];
          delete room_obj[prop];
        }
      }
    }
  });
});
