function getName() {
    // Get the value from the input field
    var userName = document.getElementById('floatingInput').value;

    // Check if the user provided a name
    if (userName) {

        // Redirect to another HTML view
        window.open('main.html?name=' + encodeURIComponent(userName));
    } else {
        alert("You didn't enter a name!");
    }
}