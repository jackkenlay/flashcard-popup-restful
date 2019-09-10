const view = require('./../view/popup.js');
const axios = require('axios');

// const config = require('./../config-local.json');
const config = require('./../config.json');

module.exports = {
  start: async () => {
    console.log('Config: ' + JSON.stringify(config,null,4));
    console.log(`Showing a card every ${config.seconds} seconds`);

    let showNextCard = async () => {
      
      //get the next card from the server
      let card = await getNextCard();

      console.log('Card before format: ' + JSON.stringify(card,null,4));

      card = formatCard(card);
      //console.log('Card after format: ' + JSON.stringify(card,null,4));
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

    setInterval(showNextCard, config.seconds * 1000);
  },
  stop: function () {
    process.exit();
  }
};


//Temp
function formatCard(card){
  console.log('Formatting card: ' + JSON.stringify(card,null,4));
  try{
    const tempBack = JSON.parse(card.back);
    const dictionaryDefintions = JSON.parse(tempBack.dictionarydefinition);
    console.log('temp back: ' + JSON.stringify(tempBack,null,4));

    return {
      front:card.front,
      back:dictionaryDefintions,
      cardId:card.id
    };  
  }catch(err){
    console.log('Error formatting card: ');
  }
}

async function returnResult(card,response){
  console.log('return result to server:');
  console.log(JSON.stringify(card,null,4));
  console.log('returning to server: ' + JSON.stringify(response,null,4));

  try {
    await axios.post(config.host+'/answerCard', {
      cardId:card.cardId,
      response,
    });
  }catch (err){
    // console.log('error returning to server: ');
    console.log('error returning to server: ', err);
  }
}

async function getNextCard(){
  try {
    console.log('Getting next card...')
    
    let response = await axios.get(config.host+'/getNextCard', {
      params: {
        userId: config.userId,
        deckId: config.deckId
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