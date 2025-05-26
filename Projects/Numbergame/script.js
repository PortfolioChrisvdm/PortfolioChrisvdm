// Scores and round
let humanScore = 0;
let computerScore = 0;
let currentRoundNumber = 1;

// Generate a random number 0-9
function generateTarget() {
  return Math.floor(Math.random() * 10);
}

// Compare human and computer guesses, human wins ties
function compareGuesses(humanGuess, computerGuess, target) {
  const humanDiff = Math.abs(target - humanGuess);
  const computerDiff = Math.abs(target - computerGuess);
  return humanDiff <= computerDiff;
}

// Update score depending on the winner
function updateScore(winner) {
  if (winner === 'human') {
    humanScore += 1;
  } else if (winner === 'computer') {
    computerScore += 1;
  }
}

// Increment round number
function advanceRound() {
  currentRoundNumber += 1;
}

// Get DOM elements
const roundNumberEl = document.getElementById('round-number');
const humanScoreEl = document.getElementById('human-score');
const computerScoreEl = document.getElementById('computer-score');
const targetNumberEl = document.getElementById('target-number');
const resultMessageEl = document.getElementById('result-message');
const humanGuessInput = document.getElementById('human-guess');
const guessBtn = document.getElementById('guess-btn');

let target = generateTarget();

function playRound() {
  const humanGuess = Number(humanGuessInput.value);

  // Validate input
  if (humanGuess < 0 || humanGuess > 9 || isNaN(humanGuess)) {
    alert('Please enter a number between 0 and 9.');
    return;
  }

  const computerGuess = generateTarget();

  // Show target number
  targetNumberEl.textContent = `Target Number: ${target}`;

  // Decide winner
  const humanWon = compareGuesses(humanGuess, computerGuess, target);

  // Update score
  if (humanWon) {
    updateScore('human');
    resultMessageEl.textContent = `You won! Your guess: ${humanGuess}. Computer's guess: ${computerGuess}.`;
  } else {
    updateScore('computer');
    resultMessageEl.textContent = `Computer won! Your guess: ${humanGuess}. Computer's guess: ${computerGuess}.`;
  }

  // Update scoreboard and round
  humanScoreEl.textContent = humanScore;
  computerScoreEl.textContent = computerScore;

  advanceRound();
  roundNumberEl.textContent = currentRoundNumber;

  // Prepare for next round: new target
  target = generateTarget();

  // Reset input
  humanGuessInput.value = '';
  humanGuessInput.focus();
}

// Attach event listener
guessBtn.addEventListener('click', playRound);

// Optional: allow Enter key to submit guess
humanGuessInput.addEventListener('keydown', event => {
  if (event.key === 'Enter') {
    playRound();
  }
});
