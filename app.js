
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

var userCount = 0;
var scoreSum = 0;

app.get('/', routes.index);
app.get('/users', user.list);

io.sockets.on('connection', function(socket) {
    userCount++;
    socket.on('disconnect', function(sessionID) {
        console.log('disconnecting');
        scoreSum -= parseInt(socket["currScore"]);
        console.log("scoreSum: " + scoreSum);
        userCount--;
    });
    socket.on('scoreChange', function(score) {
        score = parseInt(score, 10);
        if(score) {
            console.log("got it: " + score)
            if(socket["currScore"]){
                scoreSum -= parseInt(socket["currScore"]);
            }
            scoreSum += score;
            socket["currScore"] = score;
            console.log("scoreSum: " + scoreSum);
        }
    });
});
