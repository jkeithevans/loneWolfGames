let helpers = require('../../gameScripts/deckHelpersAPI');

const IntervalLogic = (function () {

  intervalGameCheck = (deck) => {
    let { cardHash } = helpers;
    let intervalCheck = false;
    let stockCardRank = cardHash[deck['stock'][deck.stock.length-1].split('-')[1]];
    for(let i = 1; i <= 4; i++) {
      let wasteCardRank = cardHash[deck[`waste${i}`][deck[`waste${i}`].length-1].split('-')[1]];
     
      for(let j = 1; j <= 4; j++) {
        let deckCardRank = deck[`deck${j}`][deck[`deck${j}`].length-1].split('-')[1];
        let neededRank = cardHash[deckCardRank] + j;
        if(deckCardRank === 'king') continue;
        if(neededRank > 13) neededRank = neededRank - 13;
        if(neededRank === stockCardRank) {
          return {
            fromCard: deck['stock'][deck.stock.length-1],
            toCard: deck[`deck${j}`][deck[`deck${j}`].length-1],
          };
        } 
        if(neededRank === wasteCardRank) {
          return {
            fromCard: deck[`waste${i}`][deck[`waste${i}`].length-1],
            toCard: deck[`deck${j}`][deck[`deck${j}`].length-1],
          };
        } 
      }
    }
    if(deck.stock.length > 1){
      return {
        fromCard: deck.stock[deck.stock.length-1],
        toCard: 'waste',
      } 
    };
    return intervalCheck;
  };

  const intervalDeckUpdate = (updatedDeck) => {
    let gameCheckResults = intervalGameCheck(updatedDeck);
    return (gameCheckResults)
      ? { setCurrentGame: updatedDeck, setMoveHint: gameCheckResults }
      : { setAppModal: 'loss', setMoveHint: {toCard: null, fromCard: null}};
  };

  const intervalMoveCard = (moveData) => {
    let { cardHash } = helpers;
    let { fromCard, toCard, cardDeck } = moveData;
    let fromCardRank = fromCard.card.split('-')[1],
        toCardRank = toCard.card.split('-')[1],
        fromDeck = cardDeck[fromCard.deck],
        toDeck = cardDeck[toCard.deck];

    if((toCard.card.match(/king/)) && (toCard.deck.match(/deck/))) {
      return { setGameModal: 'invalid move' };
    }
    if((toCard.deck.match(/waste/)) && (!fromCard.deck.match(/waste/))) {
      toDeck.push(fromCard.card);
      fromDeck.pop();
      cardDeck[fromCard.deck] = fromDeck;
      cardDeck[toCard.deck] = toDeck;
      return intervalDeckUpdate(cardDeck);
    }
    if(toCard.deck.match(/deck/)) {
      let checkInterval = +toCard.deck.slice(-1);
      let neededFromValue = (cardHash[toCardRank] + checkInterval > 13) 
        ? (cardHash[toCardRank] + checkInterval) - 13
        : (cardHash[toCardRank] + checkInterval);
      if(cardHash[fromCardRank] === neededFromValue) {
        toDeck.push(fromCard.card);
        fromDeck.pop();
        cardDeck[fromCard.deck] = fromDeck;
        cardDeck[toCard.deck] = toDeck;
        return intervalDeckUpdate(cardDeck);
      }
    }
    return { setGameModal: 'invalid move' };
  };

  intervalWinCheck = (data) => {
    let moveResults = intervalMoveCard(data);
    let winCount = 0;
    for (let deck in data.cardDeck) {
      (deck.match(/deck/)) && data.cardDeck[deck][data.cardDeck[deck].length-1].match(/king/) && winCount++;
    }
    return (winCount === 4)
      ? { setAppModal: 'win', setCurrentGame: 'win', setMoveHint: {toCard: null, fromCard: null}}
      : moveResults;
  };

  return {
    deckUpdate: intervalDeckUpdate,
    winCheck: intervalWinCheck
  };

})();

module.exports = IntervalLogic;