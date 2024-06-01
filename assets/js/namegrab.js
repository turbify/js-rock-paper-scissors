
// Function to get query parameters
function getQueryParam(param) {
    var urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

// Get the 'name' query parameter
var userName = getQueryParam('name');

// Display a welcome message
if (userName) {
    document.getElementById('welcomeMessage').innerText = "Welcome, " + userName + "!";
} else {
    document.getElementById('welcomeMessage').innerText = "Welcome!";
}