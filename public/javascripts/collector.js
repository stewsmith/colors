var socket = io.connect('/');

socket.on('rgb', function(obj) {
  $('#student-' + obj.studentId).css('background-color', obj.rgb);
});

socket.on('joined', function(sessionID) {
  console.log("joined-to received for: " + sessionID);
});

// obj is { studentId and studentCount }
socket.on('studentDisconnect', function(obj) {
  $('#student-count').text(obj.studentCount);
  $('#student-' + obj.studentId).hide();
});

socket.on('createStudent', function(studentCount) {
  $('#student-count').text(studentCount);
});

