console.log("in game.js")

const ROCK="Rock";
const SCISSORS="Scissors";
const PAPER="Paper";

function getComputerChoice () {
    let pick = Math.floor(Math.random()*3);
    //console.log("computer choice: " + pick)
    switch (pick) {
        case 0: return ROCK;
        case 1: return SCISSORS;
        case 2: return PAPER;
    }
}

function playRound(playerSelection) {
    let computerSelection = getComputerChoice();
    let result;
    let score;
    if (playerSelection === computerSelection) {
        result = "TIE";
        score = 0;
    } else if(playerSelection === ROCK) {
        if (computerSelection === PAPER) {
            result="You Lose! Paper covers Rock";
            score = -1;
        } else {
            result="You Win! Rock breaks Scissors";
            score = +1;
        }
    } else if (playerSelection === SCISSORS){
        if(computerSelection === PAPER) {
            result="You Win! Scissors cut Paper";
            score = +1;
        } else {
            result="You Lose! Rock breaks Scissors";
            score = -1;
        }
    } else if (playerSelection === PAPER) { // must be paper
        if(computerSelection === ROCK) {
            result="You Win! Paper covers Rock";
            score = +1;
        } else {
            result="You Lose! Scissors cut Paper"
            score = -1;
        }
    } else {
        error ("playerSelection not found");
    }
    //console.log(result);
    return [result,score];

}

let playerScore = 0;
let computerScore = 0;
let result = "Ready to Play?";

const resultDisplay = document.querySelector('#result');
const playerDisplay = document.querySelector('#playerScore');
const computerDisplay = document.querySelector('#computerScore');
const gameDisplay = document.querySelector('#gameResult');

resultDisplay.textContent = result;
playerDisplay.textContent = playerScore;
computerDisplay.textContent = computerScore;


const buttons = document.querySelectorAll('button');

buttons.forEach((button) => {
    button.addEventListener('click', () => {
        if (playerScore >=5 || computerScore >=5) {
            //reset score
            playerScore = 0;
            computerScore = 0;
            gameDisplay.textContent="";
        }
        
        let playerSelection = button.id;
        [result,score] = playRound(playerSelection);
        
        switch (score) {
            case -1: 
                computerScore++;
                break;
            case 0:
                break;
            case 1:
                playerScore++;
                break;
            default:
                error("incorrect score for this round");
        }

        resultDisplay.textContent = result;
        playerDisplay.textContent = playerScore;
        computerDisplay.textContent = computerScore;

        if (playerScore >= 5) {
            gameDisplay.textContent = "You won the game! Choose again to start a new game.";
        } else if (computerScore >=5) {
            gameDisplay.textContent = "You lost the game! Choose again to start a new game.";
        }
            
    });
});
