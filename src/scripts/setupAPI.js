let deck = require('../components/games/gameScripts/deckHelpersAPI');
let castleGame = require('../components/games/castle/castleScripts/castleLogicAPI');
let intervalGame = require('../components/games/interval/intervalScripts/intervalLogicAPI');
let paganiniGame = require('../components/games/paganini/paganiniScripts/paganiniLogicAPI');

const setupInterface = (function() {

  setUserGames = () => {
    return [
      {
        name: 'Beleagured Castle',
        deck: deck.getShuffledDeck('Beleagured Castle'),
        wins: 0,
        losses: 0,
        logic: 'castleGame'
      },
      {
        name: 'Paganini',
        deck: deck.getShuffledDeck('Paganini'),
        wins: 0,
        losses: 0,
        logic: 'paganiniGame'
      },
      {
        name: 'Broken Intervals',
        deck: deck.getShuffledDeck('Broken Intervals'),
        wins: 0,
        losses: 0,
        logic: 'intervalGame'
      },
    ];
  },

  setGameLogic = (gameLogic) => {
    switch(gameLogic) {
      case 'paganiniGame':
      return paganiniGame;
      case 'intervalGame':
      return intervalGame
      default:
      return castleGame;
    };
  }

  return {
    setUserGames: setUserGames,
    setGameLogic: setGameLogic
  };

})();

module.exports = setupInterface;