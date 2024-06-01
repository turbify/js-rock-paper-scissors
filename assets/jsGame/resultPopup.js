function showWin() {
    $('#winModal').modal('show');
    setTimeout(function () {
        $('#winModal').modal('hide');
    }, 3000); // Close after 3 seconds
}

function showLose() {
    $('#loseModal').modal('show');
    setTimeout(function () {
        $('#loseModal').modal('hide');
    }, 3000); // Close after 3 seconds
}