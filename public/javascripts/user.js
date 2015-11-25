var socket = io.connect('/');
var sessionId = location.search.substring(location.search.indexOf('=') + 1)

socket.emit('userJoin', sessionId);
$('#sessionID').append(sessionId);

window.scrollTo(0, 550);

$(window).scroll(function() {
  var rgb = $('body').css('background-color');
  var studentId = $('body').attr('id');

  socket.emit('scoreChange', {
    rgb: rgb,
    studentId: studentId,
    sessionId: sessionId
  });
});

socket.on('setStudentId', function(studentCount) {
  $('body').attr('id', studentCount);
});
