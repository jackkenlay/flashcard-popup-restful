let currentCard = 1;
// let seconds = 60 * 5;
let seconds = 20;
const view = require('./../view/popup.js');
const standardDateString = 'DD-MM-YYYY';

const axios = require('axios');
const date = require('date-and-time');

const host = '1http://127.0.0.1:3000';

module.exports = {
  start: async () => {
    // TODO
    // establish connection (connect)
    // await deckStore.loadDeck();
    // deck = deckStore.getDeck();

    console.log(`Showing a card every ${seconds} seconds`);

    let showNextCard = async () => {
      
      //get the next card from the server
      let card = await getNextCard();

      //show the front of the card to the user
      await view.showCardFront(card);

      //show the back of the card to the user and get their response.
      let backCardResponse = await view.showCardBack(card, 'right', 'wrong');

      //return card response to the server

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

async function getNextCard(){
  try{
    const response = await axios.get(host+'/getNextCard', {
      params: {
        userId: 1234
      }
    });
  }catch (err){
    console.log('error: ', err);
  }
  return response;
}