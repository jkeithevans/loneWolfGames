import React, { useContext } from 'react';
import { IntervalCard } from './index';
import AppContext from '../../../AppContext';
import game from './intervalScripts/intervalLogicAPI';

const IntervalWaste = ({ idx }) => {

  const { currentGame } = useContext(AppContext);
  
  let placement = (idx === 0) ? 'offset-1 col-2' : 'col-2';
  
  return (
    <div className={`pagePanel intervalWaste d-flex justify-content-center ${placement}`}>
      {
        currentGame.deck[`waste${idx+1}`].map((_, index) => {
          return <IntervalCard
                  idx={index}
                  // idx={idx+1}
                  key={idx+index}
                  deckType={`waste${idx+1}`}
                  checker={game.winCheck} />

        })
      }
    </div>
  );
};

export default IntervalWaste;