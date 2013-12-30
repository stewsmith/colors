var averageScore = 0;
socket.on('averageScore', function(avg) {
    averageScore = parseInt(avg);
})
