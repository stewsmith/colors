var socket = io.connect('/');

function joinSession(sessionID) {
    console.log("user joining session: " + sessionID);
    socket.emit('userJoin', sessionID);
}

function createSession() {
    var sessionID = Math.round(Math.random()*10000).toString();
    console.log("sessionID: " + sessionID);
    socket.emit('join', sessionID);
}
