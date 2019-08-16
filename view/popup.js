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


      notifier.on('click', function(notifierObject, options, event) {
        // Triggers if `wait: true` and user clicks notification
        resolve();
      });

      notifier.on('timeout', function(notifierObject, options) {
        // Triggers if `wait: true` and notification closes
        resolve();
      });
    });
  },
  showCardBack: function (card, rightText, wrongText) {
    // console.log('showing card back');
    return new Promise((resolve, reject) => {
      notifier.notify(
        {
          title: 'Back:',
          message: card.back,
          actions: [rightText, wrongText],
          timeout: 10
        },
        function (err, response) {
          // console.log('end of back');
          if (err) throw err;
          resolve(response);
        }
      );


      notifier.on('click', function(notifierObject, options, event) {
        // Triggers if `wait: true` and user clicks notification
        // got it right.
        resolve(rightText);
      });

      notifier.on('timeout', function(notifierObject, options) {
        // Triggers if `wait: true` and notification closes
        resolve();
      });
    });
  }
};
