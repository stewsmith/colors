
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

var userCount = 0;
var scoreSum = 0;
var averageScore = 0;

io.sockets.on('connection', function(socket) {
    userCount++;
    // when user leaves decrement userCount and
    // remove his score from scoreSum
    socket.on('disconnect', function(sessionID) {
        scoreSum -= parseFloat(socket["currScore"]);
        userCount--;
    });
    socket.on('scoreChange', function(score) {
        console.log("score: " + score)
        score = parseFloat(score, 10);
        console.log("scoreparsed: " + score)
        if(! isNaN(score)) {
            if(socket["currScore"]){
                scoreSum -= parseFloat(socket["currScore"]);
            }
            scoreSum += score;
            console.log("scoreSum:" + scoreSum);
            socket["currScore"] = score;
            averageScore = scoreSum / userCount;
            console.log("averageScore: " + averageScore);
            socket.broadcast.emit('averageScore', averageScore);
        }
    });
});
