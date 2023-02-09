import React, { useContext, useState } from 'react';
import AppContext from '../../../AppContext';
import GameContext from '../../GameContext';
import utility from '../../../scripts/utilitiesAPI';
import card from '../gameScripts/dragdropAPI';
import modal from '../../../scripts/modalAPI';

const CastleCard = ({ checker, deckType, idx }) => {
  
  const { currentGame,
          setCurrentGame,
          setAppModal,
          moveHint,
          setMoveHint,
          showHint } = useContext(AppContext);
  const { draggedCard } = useContext(GameContext);
  const [gameModal, setGameModal] = useState(null);
  
  const { fromCard, toCard } = moveHint;
  const dragValue = (idx === currentGame.deck[deckType].length-1) ? true : false;
  let gameName = currentGame.logic.slice(0, -4);
   
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
        case 'setAppModal':
          (checkResults[hook] === 'win')
          ? setCurrentGame({...currentGame, wins: currentGame.wins += 1})
          : setCurrentGame({...currentGame, losses: currentGame.losses += 1});
          setAppModal(modal.gameOverRestart(checkResults[hook], setAppModal));
          break;
        case 'setMoveHint':
          setMoveHint(checkResults[hook]);
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
    deck: deckType,
    card: (currentGame.deck[deckType].length === 0)
      ? 'empty-kingcard'
      : currentGame.deck[deckType][idx || 0]
  };

  let cardStyle = {
    marginLeft: isNaN(idx) ? 0 : idx * 13,
    backgroundImage: `url("../../images/${cardData.card}.png")`,
    boxShadow: (showHint && ((cardData.card === toCard) || (cardData.card === fromCard)))
      ? "0px 0px 13px 5px gold" : "none",
  };

  return (
    <div  id={cardData.card}
          className={`${gameName}PlayingCard`}
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

export default CastleCard;