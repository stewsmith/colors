averageScore = 10;
console.log("here")
socket.on('averageScore', function(avg) {
    console.log(avg);
    averageScore = parseInt(avg);
    console.log(averageScore);
})
