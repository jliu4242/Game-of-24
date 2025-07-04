var numbers = [];

const suits = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "0", "J", "Q", "K"];
const values = ["C", "D", "H", "S"];

/** 
window.onload = function() {
    buildDeck();
    shuffleDeck();
}

function buildDeck() {
    let values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
    let types = ["C", "D", "H", "S"];
    deck = [];

    for (let i = 0;i < types.length;i++) {
        for (let j=0;j < values.length;j++) {
            deck.push(values[j] + types[i]);
        }
    }

    console.log(deck);
}

function shuffleDeck() {
    for (let i = 0; i < deck.length;i++) {
        let j = Math.floor(Math.random() * deck.length);
        let temp = deck[i];
        deck[i] = deck[j];
        deck[j] = temp;
    }
     
    console.log(deck);
}
*/

function getCards() {
    const targetDiv = document.getElementById('given-cards');
    const images = targetDiv.querySelectorAll('img');

    images.forEach(img => {
        img.remove();
    });

    for (let i = 0;i < 4;i++) {
        const suit = suits[Math.floor(Math.random() * suits.length)];
        const value = values[Math.floor(Math.random() * values.length)];

        cardCode = suit + value;

        numbers.push(Number(value))

        let img = document.createElement("img");
        img.src = `https://deckofcardsapi.com/static/img/${cardCode}.png`
        document.getElementById('given-cards').appendChild(img);
    }
}