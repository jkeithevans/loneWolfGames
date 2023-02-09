import React from 'react';
import { IntervalCard } from './index';
import game from './intervalScripts/intervalLogicAPI';

const IntervalRow = ({ idx }) => {

  let placement = (idx === 0) ? 'offset-1 col-2' : 'col-2';
  
  return (
    <div className={`pagePanel intervalRow d-flex justify-content-center ${placement}`}>
      <IntervalCard idx={idx+1} deckType={`deck${idx+1}`} checker={game.winCheck} />
    </div>
  );
};

export default IntervalRow;