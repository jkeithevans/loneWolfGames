import React, { useContext  } from 'react';
import { CastleCard } from './index';
import AppContext from '../../../AppContext';
import game from './castleScripts/castleLogicAPI';

const CastleWingRow = ({ deckType, dragged }) => {

  const { currentGame } = useContext(AppContext);

  let placement = (deckType.match(/right/)) ? 'offset-1 col-4' : 'col-4';
 
  return (  
    <div className={`pagePanel wing ${placement}`}>
      { (currentGame.deck[deckType].length !== 0)   
          ? currentGame.deck[deckType].map((_, idx) => {
              return <CastleCard  idx={idx}
                            key={idx}
                            deckType={deckType}
                            checker={game.winCheck}
                            dragged={dragged} />
            })
          : <CastleCard deckType={deckType} checker={game.winCheck} dragged={dragged} />
      }
    </div>
  );
};

export default CastleWingRow;