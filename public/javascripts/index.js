var socket = io.connect('/');

function joinSession(sessionID) {
    socket.emit('userJoin', sessionID);
    window.location.href = 'user';
}

function createSession() {
    var sessionID = Math.round(Math.random()*10000).toString();
    socket.emit('join', sessionID);
    console.log("Session ID: " + sessionID);
    //window.location.href = 'collector';
}
