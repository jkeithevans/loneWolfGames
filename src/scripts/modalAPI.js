let axios = require('../api/index');

const Modal = (function() {

  createNewUser = (userInput, setters) => ({
    promptTop: "Would you like to create a new user?",
    buttonAccept: "Create",
    buttonRefuse: "Cancel",
    routineAccept: () => axios.setUser(userInput)
      .then(async (res) => {
        await setters.setUserData(res.data);
        setters.setCurrentGame(res.data.games[0]);
        setters.setAppModal(null);
        location.assign('/#/games');
      }),
    routineRefuse: () => setters.setAppModal(null)
  });

  gameOverRestart = (gameEnd, setAppModal) => ({
    promptTop: (gameEnd === 'win')
      ? 'Congratulations, you won!' : `Sorry, you lost`,
    promptBottom: "Would you like to play again?",
    buttonAccept: "Yes",
    buttonRefuse: "No",
    routineAccept: "restart",
    routineRefuse: () => {
      setAppModal(null);
      location.assign('http://localhost:3000/#/exit');
    } 
  });

  return {
    createNewUser: createNewUser,
    gameOverRestart: gameOverRestart
  };

})();

module.exports = Modal;