const choices = ["ROCK", "PAPER", "SCISSORS"];
const playerDisplay = document.getElementById("playerDisplay");
const computerDisplay = document.getElementById("computerDisplay");
const resultDisplay = document.getElementById("resultDisplay");
const playerScoreDisplay = document.getElementById("playerScoreDisplay");
const computerScoreDisplay = document.getElementById("computerScoreDisplay");
const enemyImageDisplay = document.getElementById("enemyPickTexture");
const playerImageDisplay = document.getElementById("playerPickTexture");
let playerScore = 0;
let computerScore = 0;


function playGame(playerChoice) {
    const computerChoice = choices[Math.floor(Math.random() * 3)]
    console.log("computer choice: " + computerChoice);
    let result = "";
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
    }
}