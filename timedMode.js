
let numbers = [];

const suits = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "0", "J", "Q", "K"];
const values = ["C", "D", "H", "S"];


// Function to generate random set of 4 cards each time
function getCards() {
    const targetDiv = document.getElementById('given-cards');
    const images = targetDiv.querySelectorAll('img');

    images.forEach(img => {
        img.remove();
    });

    numbers.length = 0;

    for (let i = 0;i < 4;i++) {
        const suit = suits[Math.floor(Math.random() * suits.length)];
        const value = values[Math.floor(Math.random() * values.length)];

        cardCode = suit + value;

        switch (suit) {
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
                numbers.push(Number(suit));
        }

        let img = document.createElement("img");
        img.src = `https://deckofcardsapi.com/static/img/${cardCode}.png`
        document.getElementById('given-cards').appendChild(img);

        console.log(numbers[i]);
    }
}

// Function to check the players guess
// If guess is correct, adds points and calls getCards(), else produce error comment
function checkGuess() {
    let guess = document.getElementById('input').value;
    const guessedNumbers = extractIntegers(guess);

    if (guessedNumbers.sort().join(',') === numbers.sort().join(',')) {
        const result = math.evaluate(guess);
        if (result == 24) {
            getCards();
        } else {
            // 
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