function getName() {
    var userName = document.getElementById('floatingInput').value;
    if (userName) {
        window.open('main.html?name=' + encodeURIComponent(userName));
    } else {
        alert("You didn't enter a name!");
    }
}