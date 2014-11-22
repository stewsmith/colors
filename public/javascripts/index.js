var socket = io.connect('/');

$('#sessionForm').on('submit', function(e) {
  e.preventDefault();
  var sessionId = $('#sessionInput').val();
  window.location.href = 'user?sessionID=' + sessionId;
});

function createSession() {
}

$('#createSession').on('click', function(e) {
  var sessionID = Math.round(Math.random()*10000).toString();
  socket.emit('create', sessionID);
  $('#sessionID').append(sessionID);
  $('#sessionForm').remove();
  $(this).remove();
});

socket.on('average', function(average) {
  console.log("average: " + average);
  var ending_color;
  if(average == 0) {
    ending_color = new $.Color( 'rgb(0,255,0)' );
  }
  else if(average < 0.5) {
    ending_color = new $.Color( 'rgb(255,255,0)' );
  }
  else if(average > 0.5) {
    ending_color = new $.Color( 'rgb(255,0,0)' );
  }
  $('body').animate({ backgroundColor: ending_color }, 0);
});
