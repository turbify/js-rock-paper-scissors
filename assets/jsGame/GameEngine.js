const choices = ["rock", "paper", "scissors"];
const playerDisplay = document.getElementById("playerDisplay");
const computerDisplay = document.getElementById("computerDisplay");
const resultDisplay = document.getElementById("resultDisplay");



function playGame(playerChoice) {
    const computerChoice = choices[Math.floor(Math.random() * 3)]
    console.log("computer choice: " + computerChoice);
    let result = "";
    if (playerChoice == computerChoice) {
        result = "DRAW";
    }
    else {
        switch (playerChoice) {
            case "rock":
                (computerChoice) === "SCISSORS" ? result = "YOU WIN" : result = "YOU LOSE";
                
                return result;
            case "paper":
                (computerChoice) === "ROCK" ? result = "YOU WIN" : result = "YOU LOSE";
                break;
            case "scissors":
                (computerChoice) === "PAPER" ? result = "YOU WIN" : result = "YOU LOSE";
                break;
        }
    }

    playerDisplay.innerText = "PLAYER:" + playerChoice;
    computerDisplay.innerText = "COMPUTER:" + computerChoice;
    resultDisplay.innerText = result;

}