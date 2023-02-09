import React, { useContext, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import AppContext from '../AppContext';
import axios from '../api/index';

const Dropdown = () => {

  const { userData,
          setUserData,
          currentGame,
          setCurrentGame,
          dropdown,
          setDropdown } = useContext(AppContext);

  const dropdownRef = useRef(null);
  
  const gameChange = (e) => {
    if (userData.password) {
      let userGames = userData.games;
      let newData = userGames.map(game => {
        return (game.name === currentGame.name) ? currentGame : game;
      });
      setUserData({...userData, games: newData});
      axios.saveUserGame(userData);
    };
    let { games } = userData;
    let selection = e.target.id;
    selection = selection.replace(/-/, ' ');
    let gameChoice = games.find(game => game.name === selection);
    setCurrentGame(gameChoice);
    setDropdown(!dropdown);
  }

  const dropdownHandler = () => setDropdown(!dropdown);
  
  useEffect(() => {
    const playIconSelect = (e) => {
      if(dropdownRef.current !== null && !dropdownRef.current.contains(e.target)) {
        setDropdown(!dropdown);
      }
    }
    (dropdown) && window.addEventListener('click', playIconSelect);
    return () => window.removeEventListener('click', playIconSelect);
  }, [dropdown]);

  return (
    <>
      <div className="menuTrigger" onClick={dropdownHandler}>
        <NavLink to="/games">
          <i className="fas fa-play-circle mx-3 mx-md-4" />
        </NavLink>
      </div>
      <nav ref={dropdownRef} className={`menu ${(dropdown) ? 'active' : 'inactive'}`}>
        <ul onClick={(e) => gameChange(e)}>
          <li id="Beleagured-Castle">Beleagured Castle</li>
          <li id="Paganini">Paganini</li>
          <li id="Broken-Intervals">Broken Intervals</li>
        </ul>
      </nav>
    </>
  );
};

export default Dropdown;