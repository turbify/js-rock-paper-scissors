function showWin() {
    $('#winModal').modal('show');
    setTimeout(function () {
        $('#winModal').modal('hide');
    }, 3000);
}

function showLose() {
    $('#loseModal').modal('show');
    setTimeout(function () {
        $('#loseModal').modal('hide');
    }, 3000);
}