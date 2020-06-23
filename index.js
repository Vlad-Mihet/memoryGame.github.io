/* $(document).ready(function(){
    $('.game-cell').click(function () {
        $(this).find('span').css('display', 'table-cell');
    }); 
});
 */

var gameCards = document.getElementsByClassName('game-cell');
var gameCells = document.getElementsByClassName('cell-content');
var randomNumbers = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];
var arrayLength = gameCells.length - 1;
var openedCards = [];
var cardIndexes = [];

function showCardsOnClick() {
    for (let j = 0; j < gameCards.length; j++) {
        gameCards[j].addEventListener('click', function showCard() {
            gameCards[j].children[0].style.display = 'table-cell';
            let cardValue = parseInt(gameCards[j].children[0].innerText);
            openedCards.push(cardValue);
            cardIndexes.push(j);
            setTimeout(() => {
                if (openedCards.length == 2) {
                    checkIfMatch(openedCards);
                }
            }, 250);
        });
    }
}

function generateRandomCardsContent() {
    for (let i = 0; i < gameCells.length; i++) {
        let randomNumber = Math.floor(Math.random() * arrayLength);
        gameCells[i].innerText = randomNumbers[randomNumber];
        console.log(randomNumbers[randomNumber]);
        const randomIndex = randomNumbers.indexOf(randomNumbers[randomNumber]);
        randomNumbers.splice(randomIndex, 1);
        arrayLength --;
    }
};

function checkIfMatch(array) {
    if (array[0] != array[1]) {
        gameCards[cardIndexes[0]].children[0].style.display = 'none';
        gameCards[cardIndexes[1]].children[0].style.display = 'none';
    } else {
        gameCards[cardIndexes[0]].removeEventListener('click', showCard);
        gameCards[cardIndexes[1]].removeEventListener('click', showCard);
    }
    array.pop();
    array.pop();
    cardIndexes.pop();
    cardIndexes.pop(); 
}

generateRandomCardsContent();
showCardsOnClick();