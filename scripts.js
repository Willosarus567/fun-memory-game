const cards = document.querySelectorAll('.memory-card');
const theTimer = document.querySelector('.timer'); 

var currentTime; 
var totalMatches = 0;
var timer = [0,0,0,0];
var interval;
var timerRunning = false; 

let gameArray = document.getElementsByClassName('memory-game');
let gameElement = gameArray[0];
let hasFlippedCard = false;
let lockBoard = false; 
let firstCard, secondCard;
let memoryCards = null; 

function flipCard() {
    if(lockBoard) return; 

    this.classList.add('flip'); 

    if (!hasFlippedCard) {
        // first click
        hasFlippedCard = true;
        firstCard = this;

        return;

    } else {
        // second click
        hasFlippedCard = false;
        secondCard = this; 

        checkForMatch(); 
    }
}

function checkForMatch(){
    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;  
    if(isMatch){
        totalMatches++;  
    }
    if(totalMatches == 12) {
        stop();
        alert("You have completed the game in:" + currentTime);
    }
    isMatch ? disableCards() : unflipCards();
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoard(); 
}

function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

    lockBoard = false; 
    }, 2000);
}
function resetGame(){
        document.getElementsByClassName("memory-card");
        memoryCards = document.getElementsByClassName("memory-card");
        for(var i = 0; i < memoryCards.length; i++ ) {
            memoryCards[i].classList.remove('flip');
        }
    }
function newGame(){
    location.reload();
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null]; 
}

(function shuffle() {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 24);
        card.style.order = randomPos; 
    });
})();


function runTimer() {
    currentTime = (timer[0]) + ":" + (timer[1]) + ":" + (timer[2]);
    theTimer.innerHTML = currentTime;
    timer[3]++;

    timer[0] = Math.floor((timer[3]/100)/60);
    timer[1] = Math.floor((timer[3]/100) - (timer[0] * 60));
    timer[2] = Math.floor(timer[3] - (timer[1] * 100) - (timer[0] * 6000));
}

function start() {
    if(!timerRunning)
    {
        timerRunning = true;
        interval = setInterval(function() {
            runTimer();
        }, 10); 
    } 
}

function stop() {
    clearInterval(interval); 
}

cards.forEach( card => card.addEventListener('click', flipCard));
gameElement.addEventListener('click', start); 
