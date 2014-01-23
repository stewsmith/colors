var socket = io.connect('/');

var averageScore = 0;

socket.on('averageScore', function(avg) {
    console.log(avg);
    averageScore = parseFloat(avg);
});

socket.on('joined', function(sessionID) {
    console.log("joined-to received for: " + sessionID);
    $('#session').append(sessionID);
    $('#session').append("here");
});

