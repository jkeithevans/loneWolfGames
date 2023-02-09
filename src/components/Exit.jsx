import React, { useContext } from 'react';
import AppContext from '../AppContext';
import axios from '../api/index';

const Exit = () => {

  let { userData, setUserData, currentGame } = useContext(AppContext);

  const exitGame = () => {
    if (userData.password) {
      let newData = userData.games.map((game, idx) => {
        if (game.name === currentGame.name) {
          userData.games.splice(idx, 1, currentGame);
        } 
      });
      setUserData({...userData, games: newData});
      axios.saveUserGame(userData)
        .then(res => location.assign('https://www.google.com/'))
    };
  };

  return (
    <div className="page">
      <h1 className="text-center">Goodbye</h1>
      <div className="pagePanel offset-1 col-10 offset-xl-3 col-xl-6 mt-4 p-3">
        <h5 className="ml-5 mb-3">Exit</h5>
        <h6 className="mx-5 mt-2">
          Are you sure you want to exit Lone Wolf Games?
        </h6>
        <div className="row">
          <button className="acceptButton shimmer offset-3 col-6 offset-md-2 col-md-3 mt-4 mb-2 py-2" type="button" onClick={() => exitGame()}>Exit game</button>
          <button className="refuseButton shimmer offset-3 col-6 offset-md-2 col-md-3 mt-4 mb-2 py-2" type="button" onClick={() => history.back()}>Don't exit</button>
        </div>
      </div>
    </div>
  )
};

export default Exit;