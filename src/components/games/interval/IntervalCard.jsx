import React, { useContext, useState } from 'react';
import AppContext from '../../../AppContext';
import GameContext from '../../GameContext';
import utility from '../../../scripts/utilitiesAPI';
import card from '../gameScripts/dragdropAPI';
import modal from '../../../scripts/modalAPI';

const IntervalCard = ({ checker, deckType, idx }) => {
  const { currentGame,
          setCurrentGame,
          setAppModal,
          moveHint,
          setMoveHint,
          showHint } = useContext(AppContext);
  const { draggedCard } = useContext(GameContext);
  const [gameModal, setGameModal] = useState(null);

  let { fromCard, toCard } = moveHint;
  let currentDeck = currentGame.deck[deckType] || null;
  let wasteDeck = deckType.match(/waste/);
  let deckEnd = currentDeck[currentDeck.length - 1];

  let dragValue = false;
  if ((deckEnd) && (!deckType.match(/deck/))) {
    dragValue = true;
  } 
  if (deckEnd.match(/empty/)) {
    dragValue = false;
  }

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

  let cardData = {
    id: idx,
    deck: deckType,
    card: (wasteDeck) ? currentDeck[idx] : deckEnd
  };

  const setShadow = () => {
    if (!showHint) return false;
    if (((toCard === 'waste') && wasteDeck) && (currentDeck[idx] ===  deckEnd)) {
      return true;
    }
    if ((cardData.card === toCard) || (cardData.card === fromCard)) {
      return true;
    }
  }
  
  let marginFactor = (currentDeck.indexOf(cardData.card) === 0) ? currentDeck.indexOf(cardData.card) : (currentDeck.indexOf(cardData.card)-1);

  let cardStyle = {
    marginTop: (wasteDeck) ? marginFactor * 25 : 'none',
    backgroundImage: `url("../../images/${cardData.card}.png")`,
    boxShadow: setShadow() ? '0px 0px 13px 5px gold' : 'none',
    border: (cardData.card.match(/empty/)) ? '1px solid rgb(150, 150, 150, .6)' : 'none'
  };
 
  return (
    <div  className={`${currentGame.logic.slice(0, -4)}PlayingCard`}
          style={cardStyle}
          draggable={dragValue}
          onDragStart={card.dragstart_handler(cardData, draggedCard, cardStyle.backgroundImage)}
          onDragOver={card.dragover_handler(cardData)}
          onDrop={(dragValue || (utility.numberFilter(deckType) < 5))
            ? card.drop_handler(cardData, checkHandler)
            : f=>f} >
      {gameModal && <div id="gameModal" className="text-center">
                      <h6 className="py-1 px-3">{gameModal}</h6>
                    </div>}
    </div>
  );
};

export default IntervalCard;