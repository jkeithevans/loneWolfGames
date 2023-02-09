const User = require('../models/user');
const Game = require('../models/game');
const deck = require('../../src/components/games/gameScripts/deckHelpersAPI');

module.exports = {

  createUser(req, res, next) {
    const { username, password} = req.body;
    User.create({
      username: username,
      password: password,
      games: [
        {
          name: 'Beleagured Castle',
          deck: deck.getShuffledDeck('Beleagured Castle'),
          wins: 0,
          losses: 0,
          logic: 'castleGame'
        },
        {
          name: 'Paganini',
          deck: deck.getShuffledDeck('Paganini'),
          wins: 0,
          losses: 0,
          logic: 'paganiniGame'
        },
        {
          name: 'Broken Intervals',
          deck: deck.getShuffledDeck('Broken Intervals'),
          wins: 0,
          losses: 0,
          logic: 'intervalGame'
        },
      ]
    })
      .then(created => {
        res.send(created)
      })
      .catch(err => new Error(err))
  },

  readUser(req, res, next) {
    const { username, password } = JSON.parse(req.params.userdata);
    User.findOne({
      username: username,
      password: password
    })
      .then(result => res.send(result))
      .catch(err => new Error(err))
  },

  updateUser(req, res, next) {
    const { games, _id} = req.body;
    User.findById(_id, (err, user) => {
      user.games = games;
      user.save();
    })
      .then(result => res.send(result))
      .catch(err => new Error(err))
  },
  
  readGame(req, res, next) {
    const game = req.params.game;
    Game.findOne({name: game})
      .then(results => {
        res.json(results.instructions)
      })
      .catch(err => new Error(err))
  },

};