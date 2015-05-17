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
  rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
  var red   = rgb[1],
      green = rgb[2],
      blue  = rgb[3];

  socket.emit('scoreChange', {
    red: red,
    green: green,
    blue: blue,
    sessionId: params.sessionID
  });
});

function passToBack(position) {
    var docHeight = $(document).height();
    console.log(position / docHeight);
    var obj = {"score": (position / docHeight),
        "sessionID": params.sessionID};
    socket.emit('scoreChange', obj);
    return false;
}
