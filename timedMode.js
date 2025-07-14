
let numbers = [];

const values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "0", "J", "Q", "K"];
const suits = ["C", "D", "H", "S"];

let score = 0;

// Function to generate random set of 4 cards each time
function getCards() {
    removeImages();

    numbers.length = 0;
 
    for (let i = 0;i < 4;i++) {
        const suit = suits[Math.floor(Math.random() * suits.length)];
        const value = values[Math.floor(Math.random() * values.length)];

        cardCode = value + suit;

        switch (value) {
            case 'A':
                numbers.push(1);
                break;
            case 'J':
                numbers.push(11);
                break;
            case 'Q':
                numbers.push(12);
                break;
            case 'K':
                numbers.push(13);
                break;
            default:
                numbers.push(Number(value));
        }

        let img = document.createElement("img");
        img.src = `https://deckofcardsapi.com/static/img/${cardCode}.png`
        document.getElementById('given-cards').appendChild(img);
    }
}

// Function to check the players guess
// If guess is correct, adds points and calls getCards(), else produce error comment
function checkGuess() {
    let guess = document.getElementById('input').value;
    const guessedNumbers = extractIntegers(guess);

    if (guessedNumbers.sort().join(',') === numbers.sort().join(',')) {
        const result = math.evaluate(guess);
        if (Math.abs(result - 24) < 1e-3) {
            addScore();
            getCards();
        } else {
            wrongAnswer();
        }
    } else {
        // Produce error comment
    }

    document.getElementById('input').value = '';
}

function extractIntegers(guess) {
    const matches = guess.match(/\d+/g);
    const integers = matches.map(Number);

    return integers;
}

function addScore() {
    score += 100;
    document.getElementById('score').textContent = score;
}

function wrongAnswer() {
    score -= 50;
    document.getElementById('score').textContent = score;
}

function minusScore() {
    score -= 20;
    document.getElementById('score').textContent = score;
}

function removeImages() {
    const targetDiv = document.getElementById('given-cards');
    const images = targetDiv.querySelectorAll('img');

    images.forEach(img => {
        img.remove();
    });
}

function checkCombination() {
    if (checkValidCombination()) {
        minusScore();
        getCards();
    } else {
        getCards();
    }
}

function checkValidCombination() {
    let validCombination = false;
    console.log("Checking combination for:", numbers);
    
    const ops = [(a, b) => a + b, (a, b) => a - b, (a, b) => b - a, (a, b) => a * b, (a, b) => a / b, (a, b) => b / a];
    const judgePoint24 = (numbers, [a, b, c, d] = numbers) => {
        switch (numbers.length) {
            case 4:
                return [[a, b, c, d], [a, c, b, d], [a, d, c, b], [b, c, a, d], [b, d, a, c], [c, d, a, b]]
                    .some(([w, x, y, z]) => ops.some(f => judgePoint24([f(w, x), y, z])));
            case 3:
                return [[a, b, c], [b, c, a], [a, c, b]].some(([x, y, z]) => ops.some(f => judgePoint24([f(x, y), z])));
            case 2:
                return ops.some(f => judgePoint24([f(a, b)]));
            default:
                return Math.abs(a - 24) < 1e-3;
        }
    };

    if (judgePoint24(numbers)) {
        return true;
    } else {
        return false;
    }
}

function startTimer() {
    var seconds = 60;

    // remove start game button
    const targetButton = document.getElementById('start-game');
    targetButton.remove();

    seconds = seconds < 10 ? "0" + seconds : seconds;
    document.getElementById('timer').textContent = seconds;

    const countdown = setInterval (function () {
        seconds--;
        seconds = seconds < 10 ? "0" + seconds : seconds;
        document.getElementById('timer').textContent = seconds;

        if (seconds <= 0) {
            // end game
            clearInterval(countdown);
            changeContent();
        }
    }, 1000)
}

function changeContent() {
    // remove card images
    removeImages();

    removeElement('cards-header');
    removeElement('input');
    removeElement('guess-button');
    removeElement('impossible-button');

    const scoreBar = document.createElement('div');
    scoreBar.id = 'scoreContainer';
    scoreBar.textContent = "Score: " + score;
    scoreBar.innerHTML += '<br>'
    scoreBar.classList.add('scorebar-style');
    document.body.appendChild(scoreBar);

    const tryAgain = document.createElement('a');
    tryAgain.textContent = "try again";
    tryAgain.href = "page.html";
    tryAgain.classList.add('tryAgainLink')
    const parentDiv = document.getElementById('scoreContainer')
    parentDiv.appendChild(tryAgain);
}

function removeElement(elementID) {
    const target = document.getElementById(elementID);
    target.remove();
}

