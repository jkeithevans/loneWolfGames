import React, { useContext, useEffect, useRef, useState } from 'react';
import { Castle, Paganini, Intervals, PlayerRow } from './games/index';
import AppContext from '../AppContext';
import { GameProvider } from './GameContext';

const Games = ({ gameHint, gameRestart }) => {

  const { currentGame } = useContext(AppContext);
  const [draggedCard, setDraggedCard] = useState();
  const draggedCardRef = useRef();

  const gameContext = { 'draggedCard': draggedCard };

  useEffect(() => {
    setDraggedCard(draggedCardRef.current);
  }, []);
   
  return (
     <GameProvider value={gameContext}>
      <div className="page gamePage container-fluid">
        <h1 className="text-center">{currentGame.name}</h1>
        {(currentGame.name === 'Beleagured Castle') && <Castle />}
        {(currentGame.name === 'Paganini') &&  <Paganini />}
        {(currentGame.name === 'Broken Intervals') && <Intervals />}
        <PlayerRow gameHint={gameHint} gameRestart={gameRestart}  />    
      </div>
      <div className={`${currentGame.logic.slice(0, -4)}DraggedCard`} id="draggedCard" ref={draggedCardRef}></div>
    </GameProvider>
  );
}

export default Games;