const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/loneWolf', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    })
    .catch(err => console.error(err));

const db = mongoose.connection;

module.exports = db;