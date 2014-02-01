var socket = io.connect('/');

function joinSession(sessionID) {
    socket.emit('userJoin', sessionID);
    window.location.href = 'user?sessionID=' + sessionID;
}

function createSession() {
    var sessionID = Math.round(Math.random()*10000).toString();
    socket.emit('create', sessionID);
    console.log("Session ID: " + sessionID);
    //window.location.href = 'collector';
}

socket.on('average', function(average) {
    console.log("average is: " + average);
});
