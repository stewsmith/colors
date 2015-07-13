var socket = io.connect('/');

$('#sessionForm').on('submit', function(e) {
  e.preventDefault();
  var sessionId = $('#sessionInput').val();
  window.location.href = 'user?sessionID=' + sessionId;
});

$('#createSession').on('click', function(e) {
  var sessionID = Math.round(Math.random()*10000).toString();
  socket.emit('create', sessionID);
  $('#sessionID').append(sessionID);
  $('#sessionForm').remove();
  $(this).remove();
});

socket.on('createStudent', function(studentCount) {
  $('.students-container').prepend("<div id='student-" + studentCount + "' class='student'>hi</div>");
});
