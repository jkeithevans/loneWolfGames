import React, { useContext, useState } from 'react';
import AppContext from '../../../AppContext';
import GameContext from '../../GameContext';
import utility from '../../../scripts/utilitiesAPI';
import card from '../gameScripts/dragdropAPI';
import modal from '../../../scripts/modalAPI';

const PagCard = ({ checker, deckType, idx }) => {
  
  const { currentGame,
          setCurrentGame,
          setAppModal,
          moveHint,
          setMoveHint,
          showHint } = useContext(AppContext);
  const { draggedCard } = useContext(GameContext);
  const [gameModal, setGameModal] = useState(null);

  let { fromCard, toCard } = moveHint;
  
  const checkHandler = (fromCard, toCard) => {
    let checkResults = checker({
      fromCard: fromCard,
      toCard: toCard,
      cardDeck: currentGame.deck
    })
    for(const hook in checkResults) {
      switch (hook) {
        case 'setCurrentGame':
          setCurrentGame({deck: checkResults[hook], ...currentGame});
          break;
        case 'setMoveHint':
          setMoveHint(checkResults[hook]);
          break;
        case 'setAppModal':
          (checkResults[hook] === 'win')
            ? setCurrentGame({...currentGame, wins: currentGame.wins += 1})
            : setCurrentGame({...currentGame, losses: currentGame.losses += 1});
          setAppModal(modal.gameOverRestart(checkResults[hook], setAppModal));
          break;
        case 'setGameModal':
          setGameModal(checkResults[hook]);
          setTimeout(() => setGameModal(null), 1500);
          break;
        default:
          break;
      }
    }
  };

  let currentCard = currentGame.deck[deckType][idx];

  const setShadow = () => {
    let shadowCard = {deck: deckType, index: idx};
    let shadowFrom = {deck: fromCard.deck, index: fromCard.hint};
    let shadowTo = {deck: toCard.deck, index: toCard.hint};
    
    if((currentCard.match(/ace/) && !currentCard.match(/empty/)) && (idx === 0)) return false;
    if((shadowCard.deck === shadowFrom.deck) && (shadowCard.index === shadowFrom.index) ||
      (shadowCard.deck === shadowTo.deck) && (shadowCard.index === shadowTo.index)) {
      return true;
    }
    if((currentCard === 'empty-ace') && ((fromCard.card.match(/ace/)) || (toCard.card.match(/ace/)))) {
      return true;
    }
    if((currentCard === fromCard.card)) {
      return true;
    }
    return false;
  }

  let cardData = {
    id: idx,
    deck: deckType,
    card: currentCard
  };

  let cardStyle = {
    marginLeft: (idx === 0) ? '0rem' : (3.5 * idx + 'rem'),
    backgroundImage: `url("../../images/${cardData.card}.png")`,
    boxShadow:  (showHint && setShadow()) ? '0px 0px 13px 5px gold' : 'none',
    border: (cardData.card.match(/empty/)) ? '1px solid rgb(150, 150, 150, .6)' : 'none'
  }
  
  return (
    <div  className={`${currentGame.logic.slice(0, -4)}PlayingCard`}
          style={cardStyle}
          draggable={(idx === 0) ? false : true}
          onDragStart={card.dragstart_handler(cardData, draggedCard, cardStyle.backgroundImage)}
          onDragOver={card.dragover_handler(cardData)}
          onDrop={(utility.numberFilter(deckType) < 9)
            ? card.drop_handler(cardData, checkHandler)
            : f=>f} >
      {gameModal && <div id="gameModal" className="text-center">
                      <h6 className="py-1 px-3">{gameModal}</h6>
                    </div>}
    </div>
  );
};

export default PagCard;