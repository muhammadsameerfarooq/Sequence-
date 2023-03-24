import Deck from "./deck.js";

const CARD_STORAGE_KEY = "my_card_game_cards";
let fullDeck;
let Player1cards;
let Player2cards;

// Check if cards are already stored in local storage
const storedCards = localStorage.getItem(CARD_STORAGE_KEY);
if (storedCards) {
  // Use the stored cards
  const {
    fullDeck: storedFullDeck,
    Player1cards: storedPlayer1cards,
    Player2cards: storedPlayer2cards,
  } = JSON.parse(storedCards);
  fullDeck = storedFullDeck;
  Player1cards = storedPlayer1cards;
  Player2cards = storedPlayer2cards;
} else {
  // Generate new cards
  const deck1 = new Deck();
  deck1.shuffle();

  const deck2 = new Deck();
  deck2.shuffle();

  fullDeck = deck1.cards.concat(deck2.cards);

  Player1cards = [];
  for (let i = 0; i < 6; i++) {
    const randomIndex = Math.floor(Math.random() * fullDeck.length);
    const card = fullDeck.splice(randomIndex, 1)[0];
    Player1cards.push(card);
  }

  Player2cards = [];
  for (let i = 0; i < 6; i++) {
    const randomIndex = Math.floor(Math.random() * fullDeck.length);
    const card = fullDeck.splice(randomIndex, 1)[0];
    Player2cards.push(card);
  }

  // Store the generated cards in local storage
  localStorage.setItem(
    CARD_STORAGE_KEY,
    JSON.stringify({ fullDeck, Player1cards, Player2cards })
  );
}

// Render the cards
const deckElement = document.getElementById("deck");
fullDeck.forEach((card) => {
  const cardElement = document.createElement("div");
  cardElement.className = `card ${
    card.suit === "♦" || card.suit === "♥" ? "red" : "black"
  }`;
  cardElement.innerText = `${card.value} ${card.suit}`;
  deckElement.appendChild(cardElement);
});
// Player 1

const Player1cardsElements = document.getElementById("Player1cards");
Player1cards.forEach((card, index) => {
  const cardElement = document.createElement("div");
  cardElement.className = `card ${
    card.suit === "♦" || card.suit === "♥" ? "red" : "black"
  }`;
  cardElement.innerText = `${card.value} ${card.suit}`;
  cardElement.addEventListener("click", () => {
    if (!cardElement.dataset.confirmed) {
      cardElement.dataset.confirmed = true;
      confirmCardReplacement1(cardElement, index, Player1cards);
    }
    cardElement.style.display = "none";
  });
  cardElement.setAttribute("data-player", "player 1");
  Player1cardsElements.appendChild(cardElement);
});

const player1Cards = document.querySelectorAll("#Player1cards .card");

player1Cards.forEach((card, index) => {
  card.addEventListener("click", () => {
    if (!card.dataset.confirmed) {
      card.dataset.confirmed = true;
      confirmCardReplacement1(card, index, Player1cards);
    }
  });
});

function confirmCardReplacement1(card, index, playerCards) {
  card.style.backgroundColor = "yellow";
  const confirmMessage = "Are you sure you want to put this card?";
  if (confirm(confirmMessage)) {
    const boxclass = document.querySelectorAll(".boxclass");
    boxclass.forEach((sequenceboxes, index) => {
      if (
        card.innerText == sequenceboxes.innerText ||
        card.innerText == "J ♦"
      ) {
        sequenceboxes.classList.add("selected");
      }
    });
    card.dataset.confirmed = true;
  } else if (card.dataset.confirmed !== "true") {
    card.style.backgroundColor = "white";
    card.dataset.confirmed = false;
  }

  if (card.dataset.confirmed == "true") {
    const randomIndex = Math.floor(Math.random() * fullDeck.length);
    const newCard = fullDeck.splice(randomIndex, 1)[0];

    playerCards[index] = newCard;
    card.innerText = `${newCard.value} ${newCard.suit}`;
    const replacementCard = document.createElement("div");
    replacementCard.className = `card ${
      newCard.suit === "♦" || newCard.suit === "♥" ? "red" : "black"
    }`;

    replacementCard.innerText = `${newCard.value} ${newCard.suit}`;
    card.parentElement.replaceChild(replacementCard, card);

    replacementCard.addEventListener("click", () => {
      confirmCardReplacement1(replacementCard, index, playerCards);
    });
  }
}

// Player 2

const Player2cardsElements = document.getElementById("Player2cards");

Player2cards.forEach((card, index) => {
  const cardElement = document.createElement("div");
  cardElement.className = `card ${
    card.suit === "♦" || card.suit === "♥" ? "red" : "black"
  }`;
  cardElement.innerText = `${card.value} ${card.suit}`;
  cardElement.addEventListener("click", () => {
    if (!cardElement.dataset.confirmed) {
      cardElement.dataset.confirmed = true;
      confirmCardReplacement(cardElement, index, Player2cards);
    }
    cardElement.style.display = "none";
  });

  cardElement.setAttribute("data-player", "player 2");
  Player2cardsElements.appendChild(cardElement);
});

const player2Cards = document.querySelectorAll("#Player2cards .card");
player2Cards.forEach((card, index) => {
  card.addEventListener("click", () => {
    if (!card.dataset.confirmed) {
      card.dataset.confirmed = true;
      confirmCardReplacement(card, index, Player2cards);
    }
  });
});

function confirmCardReplacement(card, index, playerCards) {
  card.style.backgroundColor = "yellow";
  const confirmMessage = "Are you sure you want to put this card?";
  if (confirm(confirmMessage)) {
    const boxclass = document.querySelectorAll(".boxclass");
    boxclass.forEach((sequenceboxes, index) => {
      if (
        card.innerText == sequenceboxes.innerText ||
        card.innerText == "J ♦"
      ) {
        sequenceboxes.classList.add("selected");
      }
    });
    card.dataset.confirmed = true;
  } else if (card.dataset.confirmed !== "true") {
    card.style.backgroundColor = "white";
    card.dataset.confirmed = false;
  }

  if (card.dataset.confirmed == "true") {
    const randomIndex = Math.floor(Math.random() * fullDeck.length);
    const newCard = fullDeck.splice(randomIndex, 1)[0];

    playerCards[index] = newCard;
    card.innerText = `${newCard.value} ${newCard.suit}`;
    const replacementCard = document.createElement("div");
    replacementCard.className = `card ${
      newCard.suit === "♦" || newCard.suit === "♥" ? "red" : "black"
    }`;

    replacementCard.innerText = `${newCard.value} ${newCard.suit}`;
    card.parentElement.replaceChild(replacementCard, card);

    replacementCard.addEventListener("click", () => {
      confirmCardReplacement(replacementCard, index, playerCards);
    });
  }
}
