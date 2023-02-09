import React, { useContext, useEffect, useRef } from 'react';
import AppContext from '../AppContext';
import axios from '../api/index';
import modal from '../scripts/modalAPI';

const Home = () => {

  let { appModal,
        setAppModal,
        userData,
        setUserData,
        currentGame,
        setCurrentGame } = useContext(AppContext);
  let usernameRef = useRef(),
      passwordRef = useRef();

  const handleSubmit = (e) => {
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
    let formData = {
      username: usernameRef.current.value.toLowerCase(),
      password: passwordRef.current.value
    };
    axios.getUser(JSON.stringify(formData))
    .then(res => {
      if (res.data) {
        setUserData(res.data);
        setCurrentGame(res.data.games[0]);
        setAppModal(null);
        location.assign('/#/games');
      } else {
        let setters = {
          setUserData: setUserData,
          setCurrentGame: setCurrentGame,
          setAppModal: setAppModal
        };
        setAppModal(modal.createNewUser(formData, setters));
      }
    })
  };

  useEffect(() => {
    usernameRef.current.focus();
  }, [appModal]);

  return (
    <div className="page">
      <h1 className="text-center">Welcome</h1>
      <div className="pagePanel offset-1 col-10 offset-xl-3 col-xl-6 mt-4 p-3">
        <form onSubmit={handleSubmit}>
          <h5 className="ml-5 mb-3">User Login</h5>
          <div className="row">
            <input id="nameInput" className="offset-3 col-6 offset-md-4 col-md-4 mt-3 py-1" type="text" name="username" placeholder="Enter your username" required ref={usernameRef} ></input>
          </div>
          <div className="row">
            <input className="offset-3 col-6 offset-md-4 col-md-4 mt-3 py-1" type="password" name="password" placeholder="Enter your password" required ref={passwordRef}></input>
          </div>
          <div className="row">
            <button className="acceptButton offset-3 col-6 offset-md-4 col-md-4 mt-4 mb-2 py-2" type="submit" disabled={appModal ? true : false}>Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Home;