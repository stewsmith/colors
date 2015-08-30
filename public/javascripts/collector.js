var socket = io.connect('/');

socket.on('rgb', function(obj) {
  $('#student-' + obj.studentId).css('background-color', obj.rgb);
});

socket.on('joined', function(sessionID) {
  console.log("joined-to received for: " + sessionID);
});

socket.on('createStudent', function(studentCount) {
  $('#student-count').text(studentCount);
});

