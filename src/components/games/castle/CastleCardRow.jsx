import React from 'react';
import { CastleCard, CastleWingRow } from './index';
import game from './castleScripts/castleLogicAPI';

const CastleCardRow = ({ cardRow, dragged }) => {  
  return (
    <div className="castleCardRow row mx-2">
      <CastleWingRow deckType={`left${cardRow}Deck`} />
      <div className="pagePanel foundation offset-1 col-2"> 
        <div className="d-flex justify-content-center">
          <CastleCard deckType={`ace${cardRow}Deck`} checker={game.winCheck} dragged={dragged}/>
        </div>
      </div>
      <CastleWingRow deckType={`right${cardRow}Deck`} />
    </div>
  );
};

export default CastleCardRow;