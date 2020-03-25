var cards;
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add('flip');

  if (!hasFlippedCard) {
    // first click
    hasFlippedCard = true;
    firstCard = this;

    return;
  }

  // second click
  secondCard = this;

  checkForMatch();
}

function checkForMatch() {
  let isMatch = firstCard.dataset.id === secondCard.dataset.id;

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

    resetBoard();
  }, 1500);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

function getCatImagesFromApi() {
  fetch('https://api.thecatapi.com/v1/images/search?limit=6', {
  method: "GET",
  headers: {
    'x-api-key': 'fd56e6ce-e1a8-4243-92dc-eb6ae6e76f5a' 
  }})
  .then(response => {
    return response.json()
  })
  .then(data => {
    console.log(data)
    data.forEach((cat, index) => {
      buildHTML(cat);
      buildHTML(cat);
    });
    cards = document.querySelectorAll('.memory-card');

    cards.forEach(card => card.addEventListener('click', flipCard));

    shuffle();
  })
  .catch(err => {
    throw "Something went wrong! Such a pity, it usually runs purr-fectly..."
  })
}
getCatImagesFromApi();

function buildHTML(cat)
{
  let block = `<div class="memory-card" data-id="${cat['id']}">
    <img class="front-face" src="${cat['url']}" alt="${cat['id']}" />
    <img class="back-face" src="img/cat.png" alt="cat" />
  </div>`

  document.getElementById("memory-game").innerHTML += block;
}

function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
};
