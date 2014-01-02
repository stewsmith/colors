
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

var userCount = -1; //accounts for collector -- better way needed
var scoreSum = 0;
var averageScore = 0;

io.sockets.on('connection', function(socket) {
    userCount++;
    //user scrolled, update everything
    socket.on('scoreChange', function(score) {
        socket.get('sessionID', function(err, sessionID) {
            score = parseFloat(score, 10);
            if(! isNaN(score)) {
                if(socket["currScore"]){
                    scoreSum -= parseFloat(socket["currScore"]);
                }
                scoreSum += score;
                socket["currScore"] = score;
                averageScore = scoreSum / userCount;
                var avgPackage = {"avg": averageScore};
                socket.broadcast.to(sessionID).emit('averageScore', avgPackage);
            }
        });
    });
    // Set Session ID
    socket.on('join', function(sessionID) {
        socket.set('sessionID', sessionID, function() {
            socket.emit('sessionID set');
        });
    });
    // when user leaves decrement userCount and
    // remove his score from scoreSum
    socket.on('disconnect', function(sessionID) {
        scoreSum -= parseFloat(socket["currScore"]);
        userCount--;
    });
    });
