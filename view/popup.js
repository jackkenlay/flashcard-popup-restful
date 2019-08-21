const notifier = require('node-notifier');

module.exports = {
  showCardFront: function (card) {
    return new Promise((resolve, reject) => {
      notifier.notify(
        {
          title: 'Front:',
          // subtitle: 'Deck Name:', TODO add in when multiple deck supported
          // open: void 0, // URL to open on Click, TODO add the oxford search?
          timeout: 5, // only works at 5 because mac Mojav is shit
          message: card.front,
          // case sensitive
          closeLabel: 'close'
          // actions: ['too easy','again']
        },
        function (err, response) {
          if (err) throw err;
          resolve();
        }
      );
    });
  },
  showCardBack: function (card, rightText, wrongText) {
    return new Promise((resolve, reject) => {
      notifier.notify(
        {
          title: 'Back:',
          message: card.back,
          actions: [rightText, wrongText],
          timeout: 10,
          closeLabel: 'close'
        },
        function (err, response, metadata) {
          // console.log('end of back');
          if (err) throw err;
          resolve(metadata.activationValue);
        }
      );
    });
  }
};
