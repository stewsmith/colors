var socket = io.connect('/');

var sessionId = Math.round(Math.random()*10000).toString();
$('.js-create-session').attr('href', '/present?sessionID=' + sessionId);

$('#sessionForm').on('submit', function(e) {
  e.preventDefault();
  var sessionId = $('#sessionInput').val();
  window.location.href = 'user?sessionID=' + sessionId;
});
