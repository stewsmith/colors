var averageScore = 0;

var sessionID = Math.round(Math.random()*55).toString();

socket.emit('join', sessionID);

socket.on('averageScore', function(avg) {
    console.log(avg);
    averageScore = parseInt(avg);
});
