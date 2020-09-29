const cards = document.querySelectorAll(".card");
const timerText = document.getElementsByClassName("timer")[0];
const turnsText = document.getElementsByClassName("turns")[0];



var hasFlippedCard = false;
var firstCard, secondCard;
var lockBoard = false;
var correctCardCount = 0;
var numOfTurns = 0;

cards.forEach(card => card.addEventListener('click', flipCard));
function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flip');

    if (!hasFlippedCard) {
      hasFlippedCard = true;
      firstCard = this;
      return;
    }

    secondCard = this;
    lockBoard = true;

    checkForMatch();
}

function checkForMatch() {
    numOfTurns += 1;
    turnsText.textContent = "Turns: " + numOfTurns;
    let isMatch = firstCard.children[1].children[0].innerHTML === secondCard.children[1].children[0].innerHTML;
    console.log(firstCard.children[1].children[0].innerHTML, secondCard.children[1].children[0].innerHTML);
    if (isMatch) {
        console.log("gotHere");
        disableCards();
        correctCardCount += 1;

    }
    else {
        unflipCards();
    }

}

function disableCards() {
firstCard.removeEventListener('click', flipCard);
secondCard.removeEventListener('click', flipCard);

resetBoard();
}

function unflipCards() {
setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

    resetBoard();
}, 1500);
}

function resetBoard() {
[hasFlippedCard, lockBoard] = [false, false];
[firstCard, secondCard] = [null, null];
}


seconds = 0, minutes = 0, hours = 0;

function add() {
    if (correctCardCount != 9){
        seconds++;
        if (seconds >= 60) {
            seconds = 0;
            minutes++;
            if (minutes >= 60) {
                minutes = 0;
                hours++;
            }
        }
        
        timerText.textContent = "Elapsed Time: " + (hours ? (hours > 9 ? hours : "0" + hours) : "00") + ":" + (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds);

        timer();
    }
    else {
        timerText.textContent = "You Won in " + (hours ? (hours > 9 ? hours : "0" + hours) : "00") + ":" + (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds) + " with " + numOfTurns + " turns! Refresh to play again.";
        turnsText.textContent = "";
    }
}

function timer() {
    setTimeout(add, 1000);
}
timer();

function win() {
    (correctCardCount == 9) ? true : false;
}
const symbols = [
    "A", 
    "B", 
    "C", 
    "D", 
    "E", 
    "F", 
    "G", 
    "H", 
    "I", 
    "J", 
    "K", 
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",

    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
];

var generated;
var cardCount = 0;
window.onload = function () {
    generated = generateCardArray(6, 3);
    console.log(generated);
    cards.forEach(card => {
        card.children[1].children[0].innerHTML = generated[cardCount];
        cardCount += 1;
    })
}




/* createCards(4, 3, generateCardArray(4, 3)); */
function countOccurences(arr, num) {
    var count = 0;
    for (number of arr) {
        if (number == num) count++;
    }

    return count;
}




function generateCardArray(rows, columns) {
    var numOfTiles = rows * columns;
    var numOfSymbols = numOfTiles / 2;

    //if number of tiles is odd, return
    if (numOfTiles % 2 != 0) return;
    var outOfPlaceSymbols = [...symbols];
    // shuffle symbols
    for (var a = outOfPlaceSymbols.length - 1; a > 0; a--) {
        var b = Math.floor(Math.random() * (a + 1));

        [outOfPlaceSymbols[a], outOfPlaceSymbols[b]] = [outOfPlaceSymbols[b], outOfPlaceSymbols[a]];
        
    }


    // take first 6 symbols
    var chosenSymbols = outOfPlaceSymbols.slice(0, numOfSymbols);

    //duplicate
    chosenSymbols.push(...chosenSymbols);

    // shuffle duplicates
    for (var i = chosenSymbols.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        [chosenSymbols[i], chosenSymbols[j]] = [chosenSymbols[j], chosenSymbols[i]];
    }
    console.log(chosenSymbols.length);
    return chosenSymbols;
}








