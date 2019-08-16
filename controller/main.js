let currentCard = 1;
// let seconds = 60 * 5;
let seconds = 20;
const view = require('./../view/popup.js');
let deckStore = require('./../model/deck.js');
let deck = [];
let maxNumberOfCardsPerBatch = 10;
const standardDateString = 'DD-MM-YYYY';

const date = require('date-and-time');

module.exports = {
  start: async () => {
    await deckStore.loadDeck();
    deck = deckStore.getDeck();
    console.log(`Showing a card every ${seconds} seconds`);

    let showNextCard = async () => {
      let card = getNextCard();
      await view.showCardFront(card);
      let backCardResponse = await view.showCardBack(card, 'right', 'wrong');

      if (backCardResponse === 'right') {
        card = addDaysToCard(card);
        deckStore.updateDeck();
        if (currentCard !== 0) {
          currentCard--;
        }
      } else if (backCardResponse === 'wrong') {
        card = resetCard(card);
        deckStore.updateDeck();
      } else {
        // card not answered
      }
      currentCard++;
    };
    showNextCard();

    setInterval(showNextCard, seconds * 1000);
  },
  stop: function () {
    process.exit();
  }
};

function addDaysToCard (card) {
  const now = new Date();
  let currentDate = date.format(now, standardDateString);

  // if no correctly answered days, then it's 0
  let numberOfCorrectAnswers = 0;

  // if it doesn't exist, initialistt it
  if (!card.correctlyAnsweredDates) {
    card.correctlyAnsweredDates = [];
  }

  // add today
  card.correctlyAnsweredDates.push(currentDate);

  numberOfCorrectAnswers = card.correctlyAnsweredDates.length;

  // get days to add
  let numberOfDaysToAdd = dayAdditionMap(numberOfCorrectAnswers);

  // add the days to current date.
  var newDate = new Date();
  newDate.setDate(newDate.getDate() + numberOfDaysToAdd);

  let newDateAsString = newDate.toLocaleDateString().replace(/\//ig, '-');

  // set as new due date
  card.dueDate = newDateAsString;
  // return card
  return card;
}

function dayAdditionMap (numberOfTimesAnsweredCorrectly) {
  // todo refactor
  let numberOfDaysToAdd = {
    1: 1,
    2: 3,
    3: 5,
    4: 10,
    5: 30,
    6: 45,
    7: 100
  };

  return numberOfDaysToAdd[numberOfTimesAnsweredCorrectly] || 100;
}

function resetCard (card) {
  delete card.correctlyAnsweredDates;
  delete card.dueDate;

  return card;
}

function getNextCard () {
  const now = new Date();
  let currentDate = date.format(now, standardDateString);
  let nextCard = null;
  let currentPosition = 0;

  for (let card of deck) {
    let dueDate = card.dueDate;

    // card has no due date, first time it's shown. show it OR  if the due date is today or previous to today (it's due to be shown)
    if ((dueDate === undefined) || (new Date(currentDate) >= new Date(dueDate))) {
      currentPosition++;

      if (currentPosition < currentCard) {
        continue;
      }
      if (currentCard >= maxNumberOfCardsPerBatch) {
        currentCard = 0;
      }

      nextCard = card;
      break;
    }
  };

  return nextCard;
}
