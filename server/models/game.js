const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GameSchema = new Schema(
  {
    name: String,
    instructions: Array
  }
);

const Game = mongoose.model('game', GameSchema);
module.exports = Game;