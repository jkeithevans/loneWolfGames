const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    username: String,
    password: String,
    games: [
      {
        name: String,
        deck: Object,
        wins: Number,
        losses: Number,
        logic: String
      },
    ]
  }
);

const User = mongoose.model('user', UserSchema);
module.exports = User;