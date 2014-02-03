
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');

var app = express();
var server = http.createServer(app)
var io = require('socket.io').listen(server);

// all environments
app.set('port', process.env.PORT || 5000);
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
        if (rooms[sessionID][socket.id]) {
            rooms[sessionID]["total"] -= rooms[sessionID][socket.id];
        }
        rooms[sessionID]["total"] += score;
        rooms[sessionID][socket.id] = score;
        var average = parseFloat(rooms[sessionID]["total"]) / ((Object.keys(rooms[sessionID]).length - 1)/2)
        socket.broadcast.to(sessionID).emit('average', average);
    });
    // Set Session ID
    socket.on('create', function(sessionID) {
        if(socket.join(sessionID)) {
            rooms[sessionID] = {};
            rooms[sessionID]["total"] = 0;
            console.log("just created room: " + sessionID);
        }
    });
    // Increment user count
    socket.on('userJoin', function(sessionID) {
        if(socket.join(sessionID)) {
            if (rooms[sessionID]) {
                rooms[sessionID][socket.id] = 0;
            }
        }
    });
    // when user leaves decrement userCount and
    // remove his score from scoreSum
    socket.on('disconnect', function(sessionID) {
    });
});
