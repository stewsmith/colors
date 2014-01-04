
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

var sessions = {};

io.sockets.on('connection', function(socket) {
    //user scrolled, update score and average score
    socket.on('scoreChange', function(score) {
        socket.get('sessionID', function(err, sessionID) {
            score = parseFloat(score, 10);
            console.log("Score  is: " + score);
        });
    });
    // Set Session ID
    socket.on('join', function(sessionID) {
        socket.set('sessionID', sessionID, function() {
            if(socket.join(sessionID)) {
                console.log("just joined: " + sessionID);
                socket.broadcast.to(sessionID).emit('joined', sessionID);
            }
        });
    });
    // Increment user count
    socket.on('userJoin', function() {
        console.log("userCount");
    });
    // when user leaves decrement userCount and
    // remove his score from scoreSum
    socket.on('disconnect', function(sessionID) {
        scoreSum -= parseFloat(socket["currScore"]);
    });
});
