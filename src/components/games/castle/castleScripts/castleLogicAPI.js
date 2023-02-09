let helpers = require('../../gameScripts/deckHelpersAPI');

const CastleLogic = (function () {

  castleGameCheck = (deck) => {
    let { cardHash } = helpers;
    let kingMoves = [];
    let otherMoves = [];
    
    for (holdDeck in deck) {
      let holdCard = deck[holdDeck][deck[holdDeck].length - 1];
      let holdCardSuit = holdCard && holdCard.split('-')[0];
      let holdCardRank = holdCard && holdCard.split('-')[1];
     
      for (checkDeck in deck) {
        if(checkDeck === holdDeck) continue;

        let checkCard = deck[checkDeck][deck[checkDeck].length - 1];
        let checkCardSuit = checkCard && checkCard.split('-')[0];
        let checkCardRank = checkCard && checkCard.split('-')[1];
        let possibleMove = {fromCard: holdCard, toCard: checkCard};
        
        if (checkCard === undefined && holdCard === undefined) continue;

        if (holdDeck.match(/ace/) && (holdCardSuit === checkCardSuit)) {
          if ((cardHash[holdCardRank] + 1) === cardHash[checkCardRank]) {
             otherMoves.push(possibleMove);
          }
        } else if (((Math.abs(cardHash[holdCardRank] - cardHash[checkCardRank]) === 1)) && !checkDeck.match(/ace/)) {
          if ((holdDeck.match(/left|right/) && (holdCard !== checkCard))) {
             otherMoves.push(possibleMove);
          }
        } else if (holdCard === undefined) {
          if((checkCard.slice(-4) === "king") && (deck[checkDeck].length >= 2)) {
            let secondCard = deck[checkDeck][deck[checkDeck].length-2];
            if(!/empty|king/.test(secondCard)) {
              kingMoves.push({toCard: checkCard, fromCard: 'empty-kingcard'});
            }
          }
        } else if (checkCard === undefined){
          if((holdCard.slice(-4) === "king") && (deck[holdDeck].length >= 2)) {
            let secondCard = deck[holdDeck][deck[holdDeck].length-2];
            if(!/empty|king/.test(secondCard)) {
              kingMoves.push({toCard: 'empty-kingcard', fromCard: holdCard});
            }
          }
        } else continue;
      }
    }
    return (otherMoves.length) ? otherMoves[0] :
      (kingMoves.length) ? kingMoves[0] : false;
  };

  const castleDeckUpdate = (updatedDeck) => {
    let gameCheckResults = castleGameCheck(updatedDeck);
    return (gameCheckResults)
      ? { setCurrentGame: updatedDeck, setMoveHint: gameCheckResults }
      : { setAppModal: 'loss', setMoveHint: {toCard: null, fromCard: null}};
  };

  const castleMoveCard = (moveData) => {
    let { cardHash } = helpers;
    let { fromCard, toCard, cardDeck } = moveData;
    let fromCardSuit = fromCard.card.split('-')[0],
        fromCardRank = fromCard.card.split('-')[1],
        toCardSuit = toCard.card.split('-')[0],
        toCardRank = toCard.card.split('-')[1],
        fromDeck = cardDeck[fromCard.deck],
        toDeck = cardDeck[toCard.deck];

    if (toCard.deck.match(/ace/)) {
      if ((fromCardSuit === toCardSuit)
        && (cardHash[fromCardRank] === (cardHash[toCardRank] + 1))) {
        toDeck.splice(0, 1, fromDeck.pop());
        fromDeck.slice(0, fromDeck.length - 1);
        cardDeck[fromCard.deck] = fromDeck;
        cardDeck[toCard.deck] = toDeck;
        return castleDeckUpdate(cardDeck);
      } else {
        return { setGameModal: 'invalid move' };
      }
    } else {
      if ((fromCardSuit === toCardSuit) && (fromCardRank === toCardRank)) {
        return;
      } else if ((Math.abs(cardHash[fromCardRank] - cardHash[toCardRank]) === 1)
        || ((fromCardRank === 'king') && (toCardSuit === 'empty'))) {
        toDeck.push(fromDeck.pop());
        fromDeck.slice(0, fromDeck.length - 1);
        cardDeck[fromCard.deck] = fromDeck;
        cardDeck[toCard.deck] = toDeck;
        return castleDeckUpdate(cardDeck);
      } else {
        return { setGameModal: 'invalid move' };
      }
    }
  };

  castleWinCheck = (data) => {
    let moveResults = castleMoveCard(data);
    let foundationTop, winCount = 0;
    for (let i = 1; i < 5; i++) {
      foundationTop = data.cardDeck[`ace` + i + `Deck`];
      foundationTop[0].match(/king/) && winCount++;
    }
    return (winCount === 4)
      ? { setAppModal: 'win', setCurrentGame: 'win', setMoveHint: {toCard: null, fromCard: null}}
      : moveResults;
  };

  return {
    deckUpdate: castleDeckUpdate,
    winCheck: castleWinCheck
  };

})();

module.exports = CastleLogic;