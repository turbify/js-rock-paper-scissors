const choices = ["ROCK", "PAPER", "SCISSORS"];
const playerDisplay = document.getElementById("playerDisplay");
const computerDisplay = document.getElementById("computerDisplay");
const resultDisplay = document.getElementById("resultDisplay");
const playerScoreDisplay = document.getElementById("playerScoreDisplay");
const computerScoreDisplay = document.getElementById("computerScoreDisplay");
var enemyImageDisplay = document.getElementById("enemyPickTexture");
var playerImageDisplay = document.getElementById("playerPickTexture");
let playerScore = 0;
let computerScore = 0;


function playGame(playerChoice) {

    const computerChoice = choices[Math.floor(Math.random() * 3)]
    console.log("computer choice: " + computerChoice);
    let result = "";

    switch (playerChoice) {
        case "ROCK":
            playerImageDisplay.src = "assets/textures/RockWithGreenBorder.png"
            break;
        case "PAPER":
            playerImageDisplay.src = "assets/textures/PaperWithGreenBorder.png"
            break;
        case "SCISSORS":
            playerImageDisplay.src = "assets/textures/ScissorsWithGreenBorder.png"
            break;
    }

    switch (computerChoice) {
        case "ROCK":
            enemyImageDisplay.src = "assets/textures/RockWithRedBorder.png"
            break;
        case "PAPER":
            enemyImageDisplay.src = "assets/textures/PaperWithRedBorder.png"
            break;
        case "SCISSORS":
            enemyImageDisplay.src = "assets/textures/ScissorsWithRedBorder.png"
            break;
    }

    if (playerChoice == computerChoice) {
        result = "DRAW";
    }
    else {
        switch (playerChoice) {
            case "ROCK":

                if (computerChoice === "SCISSORS") {
                    result = "YOU WIN";
                }
                else {
                    result = "YOU LOSE"
                }
                break;
            case "PAPER":
                if (computerChoice === "ROCK") {
                    result = "YOU WIN";
                }
                else {
                    result = "YOU LOSE"
                }
                break;
            case "SCISSORS":
                if (computerChoice === "PAPER") {
                    result = "YOU WIN";
                }
                else {
                    result = "YOU LOSE"
                }
                break;
        }
    }

    playerDisplay.innerText = "PLAYER:" + playerChoice;
    computerDisplay.innerText = "COMPUTER:" + computerChoice;
    resultDisplay.innerText = result;

    switch (result) {
        case "YOU WIN":
            playerScore++;
            resultDisplay.classList.add("greenText");
            playerScoreDisplay.textContent = playerScore;
            break;
        case "YOU LOSE":
            computerScore++;
            resultDisplay.classList.add("redText");
            computerScoreDisplay.textContent = computerScore;
            break;
        case "DRAW":
            resultDisplay.classList.add("drawText");
            break;
    }
}