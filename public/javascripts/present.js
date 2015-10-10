var socket = io.connect('/');
var sessionId = location.search.substring(location.search.indexOf('=') + 1)
socket.emit('createRoom', sessionId);

// Student joins
socket.on('createStudent', function(studentCount) {
  $('.students-container').prepend("<div id='student-" + studentCount + "' class='student'></div>");
});

// Student scrolls
socket.on('rgb', function(obj) {
  $('#student-' + obj.studentId).css('background-color', obj.rgb);
});

// Student leaves -- obj is { studentId and studentCount }
socket.on('studentDisconnect', function(obj) {
  $('#student-count').text(obj.studentCount);
  $('#student-' + obj.studentId).hide();
});
