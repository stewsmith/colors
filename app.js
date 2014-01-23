
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
app.get('/users', user.list);

var usersInRoom = {};

io.sockets.on('connection', function(socket) {
    //user scrolled, update score and average score
    socket.on('scoreChange', function(score) {
        socket.get('sessionID', function(err, sessionID) {
            score = parseFloat(score, 10);
            if(! isNaN(score)) {
                console.log("score is: " + score);
                //if(socket["currScore"]){
                    //scoreSum -= parseFloat(socket["currScore"]);
                //}
                //scoreSum += score;
                //socket["currScore"] = score;
                //console.log("Score: " + scoreSum)
                //averageScore = scoreSum / userCount;
                //console.log("Average Score: " + averageScore);
                //socket.broadcast.to(sessionID).emit('averageScore', averageScore);
            }
        });
    });
    // Set Session ID
    socket.on('join', function(sessionID) {
        socket.set('sessionID', sessionID, function() {
            if(socket.join(sessionID)) {
                usersInRoom.sessionID = 0;
                console.log("just created room: " + sessionID);
                io.sockets.in(sessionID).emit('joined', sessionID);
            }
        });
    });
    // Increment user count
    socket.on('userJoin', function(sessionID) {
        socket.set('sessionID', sessionID, function() {
            if(socket.join(sessionID)) {
                usersInRoom.sessionID++;
                console.log("usersInRoom: " + usersInRoom.sessionID);
                io.sockets.in(sessionID).emit('joined', sessionID);
            }
        });
    });
    // when user leaves decrement userCount and
    // remove his score from scoreSum
    socket.on('disconnect', function(sessionID) {
            usersInRoom.sessionID--;
            if(usersInRoom.sessionID < 0) {
                delete usersInRoom.sessionID;
            }
    });
});
