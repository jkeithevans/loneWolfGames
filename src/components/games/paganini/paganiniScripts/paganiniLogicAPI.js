let helpers = require('../../gameScripts/deckHelpersAPI');

const PaganiniLogic = (function () {

  paganiniGameCheck = (deck) => {
    let { cardHash } = helpers;
    let hashKeys = Object.entries(cardHash);
    let hint = {toCard: {}, fromCard: {}};
    for(let deckRow in deck) {
      if(deck[deckRow][0].match(/empty/)) {
        hint.toCard = {card: deck[deckRow][0], deck: deckRow};
        for(let checkRow in deck) {
          for(let i = 1; i <= 13; i++) {
            if(deck[checkRow][i].match(/ace/)) {
              hint.fromCard = {card: deck[checkRow][i], deck: checkRow};
              return hint;
            }
          }
        }
      } else {
        for(let i = 1; i <= 13; i++) {
          if(deck[deckRow][i].match(/empty/)) {
            let priorCardSuit = deck[deckRow][i-1].split('-')[0];
            let priorCardRank = deck[deckRow][i-1].split('-')[1];
            let fromRank = hashKeys.filter(item => item[1] === (cardHash[priorCardRank]+1));
            if (fromRank[0] === undefined) continue;
            hint.toCard = {card: deck[deckRow][i], deck: deckRow, hint: i};
            for(let searchRow in deck) {
              for(let i = 1; i <= 13; i++) {
                if(deck[searchRow][i] === `${priorCardSuit}-${fromRank[0][0]}`) {
                  hint.fromCard = {card: deck[searchRow][i], deck: searchRow, hint: i};
                  return hint;
                }
              }
            }
          }
        }
      }
    }
    return false;
  };

  const paganiniDeckUpdate = (updatedDeck) => {
    let gameCheckResults = paganiniGameCheck(updatedDeck);
    return (gameCheckResults)
      ? { setCurrentGame: updatedDeck, setMoveHint: gameCheckResults }
      : { setAppModal: 'loss', setMoveHint: {toCard: null, fromCard: null}};
  };

  const paganiniMoveCard = (moveData) => {
    let { cardHash } = helpers;
    let { fromCard: fromCardData, toCard: toCardData, cardDeck } = moveData;
    let { id: fromId, card: fromCard, deck: fromDeck } = fromCardData;
    let { id: toId, card: toCard, deck: toDeck } = toCardData;
    let fromCardSuit = fromCard.split('-')[0];
    let fromCardRank = fromCard.split('-')[1];
    fromDeck = cardDeck[fromDeck];
    toDeck = cardDeck[toDeck];
   
    if ((fromCardRank === 'ace') && (toId === 0)) {
      toDeck.splice(0, 1, fromCard);
      fromDeck.splice(fromId, 1, 'empty-card')
      cardDeck[toCardData.deck] = toDeck;
      cardDeck[fromCardData.deck] = fromDeck;
      return paganiniDeckUpdate(cardDeck);
    }
    let priorCardSuit = toDeck[toId-1].split('-')[0];
    let priorCardRank = toDeck[toId-1].split('-')[1];
    if ((priorCardSuit === fromCardSuit) && 
      (cardHash[fromCardRank] === (cardHash[priorCardRank]+1)))  {
      toDeck.splice(toId, 1, fromCard);
      fromDeck.splice(fromId, 1, toCard);
      cardDeck[toCardData.deck] = toDeck;
      cardDeck[fromCardData.deck] = fromDeck;
      return paganiniDeckUpdate(cardDeck);
    }
    return { setGameModal: 'invalid move' };
  };

  paganiniWinCheck = (data) => {
    let moveResults = paganiniMoveCard(data);
    let winCount = 0;
    for(rowDeck in data.cardDeck) {
      if(data.cardDeck[rowDeck][data.cardDeck[rowDeck].length-1].match(/empty/)) {
        winCount++;
      }
    }
    return (winCount === 8)
      ? { setAppModal: 'win', setCurrentGame: 'win', setMoveHint: {toCard: null, fromCard: null} }
      : moveResults;
  };

  return {
    deckUpdate: paganiniDeckUpdate,
    winCheck: paganiniWinCheck,
  };

})();

module.exports = PaganiniLogic;