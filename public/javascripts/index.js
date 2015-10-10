var socket = io.connect('/');

var sessionId = Math.round(Math.random()*10000).toString();
$('.js-create-session').attr('href', '/present?sessionID=' + sessionId);

$('#sessionForm').on('submit', function(e) {
  e.preventDefault();
  var sessionId = $('#sessionInput').val();
  window.location.href = 'user?sessionID=' + sessionId;
});

$('.js-create-session').on('click', function(e) {
  window.location.href = '/present'
  //socket.emit('create', sessionID);
  //$('#sessionID').append(sessionID);
  //$('#sessionForm').remove();
  //$(this).remove();
});

socket.on('createStudent', function(studentCount) {
  $('.students-container').prepend("<div id='student-" + studentCount + "' class='student'></div>");
});
