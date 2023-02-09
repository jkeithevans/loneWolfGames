import React, { useEffect, useState } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import {  About, Exit, Games, Header, 
          Home, Instructions, Landing } from './components';
import { AppModal, DevicePage, ErrorPage } from './utilities/index';
import { AppProvider } from './AppContext';
import axios from './api/index';
import setup from './scripts/setupAPI';
import deck from './components/games/gameScripts/deckHelpersAPI';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const App = () => {
  const [appModal, setAppModal] = useState(null);
  const [userData, setUserData] = useState({username: 'user', games: setup.setUserGames()});
  const [currentGame, setCurrentGame] = useState(userData.games[0]);
  const [dropdown, setDropdown] = useState();
  const [showHint, setShowHint] = useState(false);
  let logic = setup.setGameLogic(currentGame.logic);
  const [moveHint, setMoveHint] = useState(
    logic.deckUpdate(currentGame.deck).setMoveHint
  );
   
  const appContext = {
    'appModal': appModal,
    'setAppModal': setAppModal,
    'userData': userData,
    'setUserData': setUserData,
    'currentGame': currentGame,
    "setCurrentGame": setCurrentGame,
    'moveHint': moveHint,
    'setMoveHint': setMoveHint,
    'showHint': showHint,
    'setShowHint': setShowHint,
    'dropdown': dropdown,
    'setDropdown': setDropdown
  };
  console.log(currentGame)

  const gameHint = () => {
    setShowHint(true);
    setTimeout(() => setShowHint(false), 1500);
  }

  const gameRestart = () => {
    let newDeck = deck.getShuffledDeck(currentGame.name);
    let userGames = userData.games;
      for(let i = 0; i < userGames.length; i++) {
        if(userGames[i].name === currentGame.name) {
          userGames[i].deck = newDeck;
        }
      }
    setUserData({...userData, games: userGames});
    logic.deckUpdate(newDeck) && setCurrentGame({
      ...currentGame,
      deck: newDeck,
    });
    setMoveHint(logic.deckUpdate(newDeck).setMoveHint);
    setAppModal(null);
  };
 
  window.addEventListener('beforeunload', (e) => {
    e.preventDefault();
    if (userData.password) {
      let newData = userData.games.map((game, idx) => {
        if (game.name === currentGame.name) {
          userData.games.splice(idx, 1, currentGame);
        } 
      });
      setUserData({...userData, games: newData});
      axios.saveUserGame(userData);
    };
  });

  useEffect(() => {
    setMoveHint(logic.deckUpdate(currentGame.deck).setMoveHint);
  }, [currentGame]);

  return (
    <AppProvider value={appContext}>
      <HashRouter>
        <Header />
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route path="/home" component={Home} />
          <Route path="/games" component={() => <Games gameHint={gameHint} gameRestart={gameRestart}/>} />
          <Route path="/instructions" component={Instructions} />
          <Route path="/about" component={About} />
          <Route path="/exit" component={Exit} />
          <Route component={ErrorPage} />
        </Switch>
      </HashRouter>
      {(appModal) && <AppModal gameRestart={gameRestart} />}
      <DevicePage />
    </AppProvider>
  );
};

export default App;