let currentCard = 1;
// let seconds = 60 * 5;
let seconds = 20;
const view = require('./../view/popup.js');


const axios = require('axios');
const date = require('date-and-time');

const host = 'http://127.0.0.1:3000';

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

      //console.log(JSON.stringify(card,null,4));

  
      //show the front of the card to the user
      await view.showCardFront(card);

      //show the back of the card to the user and get their response.
      let backCardResponse = await view.showCardBack(card, 'right', 'wrong');

      //return card response to the server if its a fail
      /*
        If mac, you can send feedback
        May need to rewrite in Java for proper notification in future, cross platform and potentially feedback.
      */

      if(backCardResponse !== undefined){
        await returnResult(card,backCardResponse);
      }
    };
    showNextCard();

    setInterval(showNextCard, seconds * 1000);
  },
  stop: function () {
    process.exit();
  }
};

async function returnResult(card,response){
  console.log('return result to server:');
  console.log(JSON.stringify(card,null,4));
  console.log('returning to server: ' + JSON.stringify(response,null,4));

  try {
    await axios.post(host+'/answerCard', {
      cardId:card.id,
      response,
    });
  }catch (err){
    console.log('error returning to server: ');
    //console.log('error returning to server: ', err);
  }
}

async function getNextCard(){
  try {
    console.log('Getting next card...')
    let response = await axios.get(host+'/getNextCard', {
      params: {
        userId: 1234,
        deckId: 1234
      }
    });
    //console.log('response: ' + JSON.stringify(response.data,null,4));
    //console.log('-----');
    return response.data;
  }catch (err) {
    console.log('error getting next card:');
    //console.log('error: ', err);
  }
}