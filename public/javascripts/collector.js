var socket = io.connect('/');

var averageScore = 0;

socket.on('averageScore', function(avg) {
    console.log(avg);
    averageScore = parseFloat(avg);
});

socket.on('joined-to', function(sessionID) {
    console.log("sessionID: " + sessionID);
    $('#session').append(sessionID);
    $('#session').append("here");
});

socket.on('joined-emit', function(sessionID) {
    console.log("sessionID: " + sessionID);
    $('#session').append(sessionID);
    $('#session').append("here");
});
