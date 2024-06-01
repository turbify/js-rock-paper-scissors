
// Function to get query parameters
function getQueryParam(param) {
    var urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

// Get the 'name' query parameter
var userName = getQueryParam('name');
console.log("Retrieved userName:", userName); // Add this line for debugging

// Get the welcomeMessage element
var welcomeMessageElement = document.getElementById('welcomeMessage');
console.log("welcomeMessageElement:", welcomeMessageElement); // Add this line for debugging

// Display a welcome message
if (userName && welcomeMessageElement) {
    welcomeMessageElement.innerText = "Welcome, " + userName + "!";
} else {
    console.error("Error: Unable to set welcome message. userName:", userName, "welcomeMessageElement:", welcomeMessageElement);
}