//===========================================================================================================
// Retrieve all buttons with the class "control" and the "start" button
const buttons = document.getElementsByClassName("control");
const startButton = document.getElementsByClassName("start")[0]; // Assuming there's only one start button
//===========================================================================================================
// Get the DOM elements for player and computer scores
const playerScore = document.getElementById("player-score");
const computerScore = document.getElementById("computer-score");
//===========================================================================================================
// Get the DOM elements for displaying player and computer images
const playerImg = document.getElementById("player-image");
const computerImg = document.getElementById("computer-image");
//===========================================================================================================
// Get the DOM element for displaying messages to the player
const msg = document.getElementById("messages");
//===========================================================================================================
// Define the possible choices in the game
const choices = ["rock", "paper", "scissors", "lizard", "spock"];
//===========================================================================================================
// Set the score needed to win the game and game started flag
let gameOverScore = 3;
let gameStarted = false;
let userName = "Player";
// Add click event listener to the start button
startButton.addEventListener("click", function () {
  if (gameStarted) {
    // Reset the game
    playerScore.textContent = "0";
    computerScore.textContent = "0";
    msg.textContent = "";
    playerImg.src = "assets/images/rpsls.webp";
    computerImg.src = "assets/images/rpsls.webp";
  }
  gameStarted = true;
  if (userName === "Player") {
    let inputName = prompt("Please enter your name:", "Your Name Here");
    if (inputName !== null) {
      userName = inputName;
    }
  }
  msg.style.color = "black";
  msg.textContent = "Game Started! Make your choice.";
});

// Add click event listeners to each control button
for (let button of buttons) {
  button.addEventListener("click", function () {
    if (!gameStarted) {
      msg.textContent = "Please press  Start Game button first!";
      return;
    }
    let playerChoice = this.getAttribute("data-choice");
    playGame(playerChoice);
  });
}
//===========================================================================================================

//===========================================================================================================
// Function to handle the game logic when a player makes a choice
function playGame(playerChoice) {
  // Check if the game is over and announce the winner
  let playerScoreVal = Number(playerScore.textContent);
  let computerScoreVal = Number(computerScore.textContent);

  if (playerScoreVal === gameOverScore || computerScoreVal === gameOverScore) {
    msg.textContent =
      Number(playerScore.textContent) > Number(computerScore.textContent)
        ? `${userName} Winner!!!`
        : "Computer Winner!!!";
    msg.style.color = "red";

    return;
  } else {
    // Update the player's choice image
    playerImg.src = `assets/images/${choices[playerChoice]}.png`;
    playerImg.alt = choices[playerChoice];

    // Generate and display the computer's choice
    let computerChoice = Math.floor(Math.random() * 5);
    computerImg.src = `assets/images/${choices[computerChoice]}.png`;
    computerImg.alt = choices[computerChoice];

    // Determine and display the result of the round
    let result = checkWinner(choices[playerChoice], choices[computerChoice]);
    updateScores(result);
  }
}
//===========================================================================================================
// Function to determine the winner of a round
function checkWinner(player, computer) {
  // Conditions to determine the winner
  if (player === computer) {
    return "draw";
  }

  // Logic to determine if the player wins
  if (
    (player === "rock" && (computer === "scissors" || computer === "lizard")) ||
    (player === "paper" && (computer === "rock" || computer === "spock")) ||
    (player === "scissors" &&
      (computer === "paper" || computer === "lizard")) ||
    (player === "lizard" && (computer === "spock" || computer === "paper")) ||
    (player === "spock" && (computer === "scissors" || computer === "rock"))
  ) {
    return "player";
  }

  // If none of the above, computer wins
  return "computer";
}

// Function to update the scores after each round
function updateScores(result) {
  // Convert the score text to integer values
  let playerScoreVal = parseInt(playerScore.textContent);
  let computerScoreVal = parseInt(computerScore.textContent);
  let playerDiv = document.querySelector(".player");
  let computerDiv = document.querySelector(".computer");

  // Update the scores based on the round result
  if (result === "player") {
    playerScoreVal++;
    playerDiv.classList.add("winner");
    computerDiv.classList.remove("winner");
  } else if (result === "computer") {
    computerScoreVal++;
    computerDiv.classList.add("winner");
    playerDiv.classList.remove("winner");
  } else {
    playerDiv.classList.remove("winner");
    computerDiv.classList.remove("winner");
  }

  // Display the updated scores
  playerScore.textContent = playerScoreVal.toString();
  computerScore.textContent = computerScoreVal.toString();

  // Display the result of the round
  msg.textContent =
    result === "draw"
      ? "It's a draw!"
      : result === "player"
      ? `${userName} wins!`
      : "Computer wins!";
}
//===========================================================================================================
