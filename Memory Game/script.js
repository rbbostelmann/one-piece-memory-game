const cards = document.querySelectorAll(".card");
const btn = document.getElementById("btn");
let hasFlipped = false;
let firstCard, secondCard;
let lockBoard = false;

function flipCard() {
  if (lockBoard) return;
  /* Prevent double clicking the same card */
  if (this === firstCard) return;

  this.classList.add("flip");
  if (!hasFlipped) {
    hasFlipped = true;
    firstCard = this;
    return;
  }

  secondCard = this;
  hasFlipped = false;
  checkDataEquality();
}

function checkDataEquality() {
  if (firstCard.dataset.card === secondCard.dataset.card) {
    disableCards();
    return;
  }
  unflipCards();
}

function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);

  resetBoard();
}

function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");

    resetBoard();
  }, 1500);
}

function resetBoard() {
  [hasFlipped, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

/* Immediately invoked function */
(function shuffle() {
  cards.forEach((card) => {
    let randomPosition = Math.floor(Math.random() * 12);
    card.style.order = randomPosition;
  });
})();

/* Ideally this would only shuffle and unflip everything,
but since I couldn't make it work properly that way -
(things would shuffle and unflip but become nonrespondent)
I decided to load the window.*/

function playAgain() {
    location.reload();
}

btn.addEventListener("click", playAgain);
/* It isn't optimal, but that'll do, pig, that'll do. */

cards.forEach((card) => {
  card.addEventListener("click", flipCard);
});
