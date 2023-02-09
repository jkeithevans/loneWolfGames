import React, { useContext } from 'react';
import PagCard from './PagCard';
import AppContext from '../../../AppContext';
import game from './paganiniScripts/paganiniLogicAPI';

const PagCardRow = ({ cardRow }) => {

  let { currentGame } = useContext(AppContext);
  
  return (
    <div className="paganiniCardRow pagePanel mx-2">
      {
        currentGame.deck[`deck${cardRow}`].map((_, idx) => {
          return <PagCard idx={idx}
                          key={idx + cardRow}
                          deckType={'deck' + cardRow}
                          checker={game.winCheck} />
        })
        }
    </div>
  );
};

export default PagCardRow;