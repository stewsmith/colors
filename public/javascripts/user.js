var socket = io.connect('/');

function getSearchParameters() {
  var prmstr = window.location.search.substr(1);
  return prmstr != null && prmstr != "" ? transformToAssocArray(prmstr) : {};
}

function transformToAssocArray( prmstr ) {
  var params = {};
  var prmarr = prmstr.split("&");
  for (var i = 0; i < prmarr.length; i++) {
    var tmparr = prmarr[i].split("=");
    params[tmparr[0]] = tmparr[1];
  }
  return params;
}

var params = getSearchParameters();
socket.emit('userJoin', params.sessionID);
$('#sessionID').append(params.sessionID);
var $body = $('body');

$(window).scroll(function() {
  var rgb = $body.css('background-color');

  socket.emit('scoreChange', {
    rgb: rgb,
    sessionId: params.sessionID
  });
});
