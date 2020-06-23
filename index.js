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

function uncheckCards() {
    for (let i = 0; i < gameCards.length; i++) {
        gameCells[i].style.display = 'none';
        gameCards[i].style.backgroundColor = 'dodgerblue';
        gameCards[i].classList.remove('guessed');
    }
};

playAgainButton.addEventListener('click', () => {
    gameCards = document.getElementsByClassName('game-cell');
    gameCells = document.getElementsByClassName('cell-content');
    rightPairs = 0;
    openedCards = [];
    cardIndexes = [];
    clicks = 0;
    winCondition = false;
    randomNumbers = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];
    arrayLength = gameCells.length - 1;
    document.getElementById('table').style.display = 'block';
    document.getElementById('playAgainInterface').style.display = 'none';
    uncheckCards();
    generateRandomCardsContent();
    showCardsOnClick();
})

// Create a play again function 

function win() {
    document.getElementById('table').style.display = 'none';
    document.getElementById('playAgainInterface').style.display = 'block';
};

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

function generateRandomCardsContent() {
    for (let i = 0; i < gameCells.length; i++) {
        let randomNumber = Math.floor(Math.random() * arrayLength);
        gameCells[i].innerText = randomNumbers[randomNumber];
        console.log(randomNumbers[randomNumber]);
        const randomIndex = randomNumbers.indexOf(randomNumbers[randomNumber]);
        randomNumbers.splice(randomIndex, 1);
        arrayLength--;
    }
};

function checkIfMatch(array) {
    if (array[0] != array[1] && !gameCards[cardIndexes[0]].classList.contains('guessed') && !gameCards[cardIndexes[1]].classList.contains('guessed')) {
        gameCells[cardIndexes[0]].style.display = 'none';
        gameCells[cardIndexes[1]].style.display = 'none';
    } else if (gameCards[cardIndexes[0]].classList.contains('guessed') && (!gameCards[cardIndexes[1]].classList.contains('guessed'))) {
        gameCells[cardIndexes[1]].style.display = 'none';
    } else if (gameCards[cardIndexes[1]].classList.contains('guessed') && (!gameCards[cardIndexes[0]].classList.contains('guessed'))) {
        gameCells[cardIndexes[0]].style.display = 'none';
    } else if (gameCards[cardIndexes[1]].classList.contains('guessed') && (gameCards[cardIndexes[0]].classList.contains('guessed'))) {
        alert('Why would you even try that?');
    } else {
        gameCards[cardIndexes[0]].style.backgroundColor = 'green';
        gameCards[cardIndexes[1]].style.backgroundColor = 'green';
        gameCards[cardIndexes[0]].classList.add('guessed');
        gameCards[cardIndexes[1]].classList.add('guessed');
        rightPairs++;
        if (rightPairs == 8) {
            alert(`You've won in ${clicks} clicks!`);
            win();
        }
    }
    array.pop();
    array.pop();
    cardIndexes.pop();
    cardIndexes.pop();
};

generateRandomCardsContent();
showCardsOnClick();