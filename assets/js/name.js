function getName() {
    // Get the value from the input field
    var userName = document.getElementById('floatingInput').value;

    // Check if the user provided a name
    if (userName) {
        // Store the name in a variable and display it back to the user
        alert("Hello, " + userName + "!");
        
        // You can use the userName variable further in your script as needed
        console.log("User name is: " + userName);
    } else {
        alert("You didn't enter a name!");
    }
}