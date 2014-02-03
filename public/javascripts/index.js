var socket = io.connect('/');

function joinSession(sessionID) {
    socket.emit('userJoin', sessionID);
    window.location.href = 'user?sessionID=' + sessionID;
}

function createSession() {
    var sessionID = Math.round(Math.random()*10000).toString();
    socket.emit('create', sessionID);
    $('#sessionID').append(sessionID);
    $('#sessionForm').remove();
    $('#sessionButton').remove();
}

socket.on('average', function(average) {
    var ending_color = new $.Color( 'rgb(255,0,0)' ); ;//what color we want to use in the end
    $('body').animate({ backgroundColor: ending_color }, 0);
    console.log("average is: " + average);
});
