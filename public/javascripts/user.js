var socket = io.connect('/');

function getSearchParameters() {
      var prmstr = window.location.search.substr(1);
      return prmstr != null && prmstr != "" ? transformToAssocArray(prmstr) : {};
}

function transformToAssocArray( prmstr ) {
    var params = {};
    var prmarr = prmstr.split("&");
    for ( var i = 0; i < prmarr.length; i++) {
        var tmparr = prmarr[i].split("=");
        params[tmparr[0]] = tmparr[1];
    }
    return params;
}

var params = getSearchParameters();
$('#sessionID').append('sessionID: ' + params.sessionID);

$(window).scroll(function() {
    passToBack($(document).scrollTop());
});

function passToBack(position) {
    var docHeight = $(document).height();
    console.log(position / docHeight);
    var obj = {"score": (position / docHeight),
        "sessionID": params.sessionID};
    socket.emit('scoreChange', obj);
    return false;
}
