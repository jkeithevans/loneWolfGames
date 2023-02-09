import React, { useContext } from 'react';
import AppContext from '../../AppContext';
import utilities from '../../scripts/utilitiesAPI';

const PlayerRow = ({ gameHint, gameRestart }) => {

  const { appModal, userData, currentGame } = useContext(AppContext);
  
  const hintHandler = () => gameHint();
  
  const restartHandler = () => gameRestart(); 

  return (
    <div className="fixed-bottom row m-2">

      <div className="pagePanel text-center col-12 col-sm-4 py-1 my-1">
        <h4>Player&nbsp;Name</h4>
        <h5>{utilities.nameFormatter(userData.username)}</h5>
      </div>

      <button className="acceptButton gameButton col-5 col-sm-2 offset-xl-1 col-xl-1 my-1 my-sm-3"
              type="button"
              name="hint"
              disabled={appModal ? true : false}
              onClick={() => hintHandler()}>Hint
      </button>
      
      <button className="acceptButton gameButton offset-2 col-5 offset-sm-0 col-sm-2 col-xl-1 my-1 my-sm-3"
              type="button"
              name="restart"
              disabled={appModal ? true : false}
              onClick={() => restartHandler()}>Restart
      </button>

      <div className="pagePanel text-center col-12 col-sm-4 offset-xl-1 py-1 my-1">
        <div className="d-flex justify-content-around flex-row ">
          <h4 className="col-6">Wins</h4>
          <h4 className="col-6">Losses</h4>
        </div>
        <div className="d-flex justify-content-around flex-row">
          <h5 className="col-6">{currentGame.wins}</h5>
          <h5 className="col-6">{currentGame.losses}</h5>
        </div>
      </div>

    </div>
  );
};

export default PlayerRow;