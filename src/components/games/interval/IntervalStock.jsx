import React from 'react';
import { IntervalCard } from './index';
import game from './intervalScripts/intervalLogicAPI';

const IntervalStock = () => (
  <div className="pagePanel intervalStock d-flex justify-content-center col-2">
    <IntervalCard idx={0} deckType={'stock'} checker={game.winCheck} />
  </div>
);

export default IntervalStock;