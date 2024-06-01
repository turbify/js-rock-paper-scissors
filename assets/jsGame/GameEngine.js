const choices = ["rock", "paper", "scissors"];
const playerDisplay = document.getElementById("playerDisplay");
const computerDisplay = document.getElementById("computerDisplay");
const resultDisplay = document.getElementById("resultDisplay");



function playGame(playerChoice) {
    const computerChoice = choices[Math.floor(Math.random() * 3)]
    console.log(computerChoice);
    let result = "";
    if (playerChoice == computerChoice) {
        result = "DRAW";
    }
    else {
        switch (playerChoice) {
            case "rock":
                (computerChoice) === "scissors" ? "YOU WIN" : "YOU LOSE";
                break;
            case "paper":
                (computerChoice) === "rock" ? "YOU WIN" : "YOU LOSE";
                break;
            case "scissors":
                (computerChoice) === "paper" ? "YOU WIN" : "YOU LOSE";
                break;
        }
    }
    playerDisplay.texContent = 'PLAYER: ${playerChoice}';
    computerDisplay.texContent = 'COMPUTER: ${computerChoice}';
    resultDisplay.texContent = result;
}