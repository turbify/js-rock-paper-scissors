function getQueryParam(param) {
    var urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

var userName = getQueryParam('name');
console.log("Retrieved userName:", userName);

var welcomeMessageElement = document.getElementById('welcomeMessage');
console.log("welcomeMessageElement:", welcomeMessageElement);

if (userName && welcomeMessageElement) {
    welcomeMessageElement.innerText = "Welcome, " + userName + "!";
} else {
    console.error("Error: Unable to set welcome message. userName:", userName, "welcomeMessageElement:", welcomeMessageElement);
}