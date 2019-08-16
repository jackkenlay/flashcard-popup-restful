const fs = require('fs');
let currentDir = '/home/jack/personal';
let savedDeckDir = currentDir + '/flashcards-api/model/saved-deck.json';
let kindleImportDeckDir = currentDir + '/flashcards-api/model/parsedKindleDictionary/kindle-words.json';

// Expected Format:
// let deck = [
//   {
//     front: 'mou yong',
//     back: 'useless',
//     correctlyAnsweredDates:[
//       '03-09-2019',
//       '04-09-2019',
//     ],
//     dueDate:[
//       '06-09-2019'
//     ]
//   },
//   {
//     front: 'ganma',
//     back: 'what?!',
//     correctlyAnsweredDates: [
//       '03-09-2019',
//       '04-09-2019',
//     ],
//     dueDate: [
//       '06-09-2019'
//     ]
//   },
//   {
//     front: 'mmmmgoi',
//     back: 'thank you',
//     correctlyAnsweredDates: [
//       '03-09-2019',
//       '04-09-2019',
//     ],
//     dueDate: [
//       '06-09-2019'
//     ]
//   },
//   {
//     front: 'ni hao',
//     back: 'hello',
//     correctlyAnsweredDates: [
//       '03-09-2019',
//       '04-09-2019',
//     ],
//     dueDate: [
//       '06-09-2019'
//     ]
//   }
// ];

let deck = [];

module.exports = {
  getDeck: function () {
    return deck;
  },
  loadDeck: async () => {
    // load the file
    let rawdata;
    let kindleDictionaryRawData;

    // if there is a saved deck
    if (fs.existsSync(savedDeckDir)) {
      rawdata = fs.readFileSync(savedDeckDir);
      deck = JSON.parse(rawdata);
    } else {
      rawdata = fs.readFileSync(kindleImportDeckDir);
      kindleDictionaryRawData = JSON.parse(rawdata);
      // convert it to the correct format
      deck = convertKindleJSONtoDeckFormat(kindleDictionaryRawData);
    }
  },
  updateDeck: async () => {
    writeDeck();
  }
};

function writeDeck () {
  fs.writeFileSync(savedDeckDir, JSON.stringify(deck, null, 4));
}

function convertKindleJSONtoDeckFormat (kindleDictionary) {
  // [
  //   {
  //     'currentWord': 'pang',
  //     'kindleUsage': 'They feel a pang of loneliness and before rational thought occurs, they are scrolling through their Facebook feeds. ',
  //     'dictionarydefinition': [
  //       'A sudden sharp pain or painful emotion.'
  //     ],
  //     'dictionaryexamples': [
  //       'Lindsey experienced a sharp pang of guilt'
  //     ],
  //     'totalWords': 1547,
  //     'currentWordNumber': 0
  //   }
  // ];

  // TODO refactor

  let kindleDeck = [];
  kindleDictionary.forEach((entry) => {
    let dictionaryDefs = '';
    if (entry.dictionarydefinition) {
      dictionaryDefs = entry.dictionarydefinition[0] || 'Unknown';
    }

    let newObject = {
      front: entry.currentWord,
      back: `${dictionaryDefs}`
    };

    kindleDeck.push(newObject);
  });
  return kindleDeck;
}
