// Initialize the first game

var gameCards = document.getElementsByClassName('game-cell');
var gameCells = document.getElementsByClassName('cell-content');
var randomNumbers = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];
var arrayLength = gameCells.length - 1;
var openedCards = [];
var cardIndexes = [];
var rightPairs = 0;
var clicks = 0;
var winCondition = false;
var playAgainButton = document.getElementById('playAgain');
var lastPair = [];

// Make the function show all cards for a second, then hide them all

function showCardsAtStart() {
    setTimeout(() => {
        setTimeout(() => {
            for (let i = 0; i < gameCards.length; i++) {
                gameCells[i].style.display = 'none';
            }
        }, 1250);
        for (let i = 0; i < gameCards.length; i++) {
            gameCells[i].style.display = 'table-cell';
        }
    }, 1250)
}


// Make cards return to the state they were in at the beginning of the game; every new game

function uncheckCards() {
    for (let i = 0; i < gameCards.length; i++) {
        gameCells[i].style.display = 'none';
        gameCards[i].style.backgroundColor = 'dodgerblue';
        gameCards[i].classList.remove('guessed');
    }
};

// Clone all game cards, so the click event listener will be removed from each of them, and added again later on 

function cloneGameCards() {
    for (let i = 0; i < gameCards.length; i++) {
        let xclone = gameCards[i].cloneNode(true);
        xclone.appendChild[gameCells[i]];
        xclone.classList.add('game-cell');
        gameCards[i].parentNode.replaceChild(xclone, gameCards[i]);
    }
}

// Add 'play-again' functionality to the play again button by resetting everything to the default every time a game has ended

playAgainButton.addEventListener('click', () => {
    gameCards = document.getElementsByClassName('game-cell');
    gameCells = document.getElementsByClassName('cell-content');
    rightPairs = 0;
    openedCards = [];
    cardIndexes = [];
    lastPair = [];
    clicks = 0;
    winCondition = false;
    randomNumbers = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];
    arrayLength = gameCells.length - 1;
    document.getElementById('table').style.display = 'block';
    document.getElementById('playAgainInterface').style.display = 'none';
    cloneGameCards();
    uncheckCards();
    generateRandomCardsContent();
    showCardsOnClick();
    showCardsAtStart();
})

// Create the win function in order to make the play-again interface appear after every finished game;

function win() {
    document.getElementById('table').style.display = 'none';
    document.getElementById('playAgainInterface').style.display = 'block';
};

// Add onclick event listener in order to show the value of each card if it's being clicked.

function showCardsOnClick() {
    for (let j = 0; j < gameCards.length; j++) {
        gameCards[j].addEventListener('click', function showCard() {
            gameCards[j].children[0].style.display = 'table-cell';
            let cardValue = parseInt(gameCards[j].children[0].innerText);
            openedCards.push(cardValue);
            cardIndexes.push(j);
            if (openedCards.length == 2) {
                setTimeout(() => {
                    checkIfMatch(openedCards);
                }, 150);
            }
            clicks++;
        });
    }
};

// A function used in order to generate the content of all cards randomly.

function generateRandomCardsContent() {
    for (let i = 0; i < gameCells.length; i++) {
        let randomNumber = Math.floor(Math.random() * arrayLength);
        gameCells[i].innerText = randomNumbers[randomNumber];
        const randomIndex = randomNumbers.indexOf(randomNumbers[randomNumber]);
        randomNumbers.splice(randomIndex, 1);
        arrayLength--;
    }
};

// A function used to check for the last pair of card contents in order to turn them green at the end of the game 

function checkForLastTwo() {
    for (let i = 0; i < gameCards.length; i++) {
        if (!(gameCards[i].classList.contains('guessed'))) {
            lastPair.push(i);
        }
    }
    if (lastPair.length == 2) {
        gameCards[lastPair[0]].style.backgroundColor = 'green';
        gameCards[lastPair[1]].style.backgroundColor = 'green';
    }
    lastPair.pop();
    lastPair.pop();
}

// A function used to check whether the 2 cards that can be selected at once do match or not.

function checkIfMatch(array) {
    if (array[0] != array[1] && !gameCards[cardIndexes[0]].classList.contains('guessed') && !gameCards[cardIndexes[1]].classList.contains('guessed')) {
        // If the cards don't match:
        gameCells[cardIndexes[0]].style.display = 'none';
        gameCells[cardIndexes[1]].style.display = 'none';

    } else if (gameCards[cardIndexes[0]].classList.contains('guessed') && (!gameCards[cardIndexes[1]].classList.contains('guessed'))) {
        //  If any of the cards has already been guessed:
        gameCells[cardIndexes[1]].style.display = 'none';

    } else if (gameCards[cardIndexes[1]].classList.contains('guessed') && (!gameCards[cardIndexes[0]].classList.contains('guessed'))) {
        //  If any of the cards has already been guessed:
        gameCells[cardIndexes[0]].style.display = 'none';

    } else if (gameCards[cardIndexes[1]].classList.contains('guessed') && (gameCards[cardIndexes[0]].classList.contains('guessed'))) {
        // If both cards have been guessed:
        alert('Why would you even try that?');

    } else if (cardIndexes[0] == cardIndexes[1]) {
        // If the same card has been clicked twice
        if (gameCards[cardIndexes[0]].classList.contains('guessed')) {
            alert('You\'ve clicked it twice!');
        }
    } else {
        // If the cards match:
        gameCards[cardIndexes[0]].style.backgroundColor = 'green';
        gameCards[cardIndexes[1]].style.backgroundColor = 'green';
        gameCards[cardIndexes[0]].classList.add('guessed');
        gameCards[cardIndexes[1]].classList.add('guessed');
        rightPairs++;
        checkForLastTwo();
        if (rightPairs == 8) {
            setTimeout(() => {
                alert(`You've won in ${clicks} clicks!`);
                win();
            }, 500);
        }
    }
    array.pop();
    array.pop();
    cardIndexes.pop();
    cardIndexes.pop();
};

generateRandomCardsContent();
showCardsOnClick();
showCardsAtStart();