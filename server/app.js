const express = require('express');
const cors = require('cors');
const db = require('./connector/connection');
const errors = require('./errors/errorHandlers');
const logger = require('./lib/logger');
const router = require('./routes');

const app = express();

app.use(logger);
app.use(cors());

app.use(express.json()); 
app.use(express.urlencoded({ extended: false })); 

db.on('error', console.error.bind(console, "Mongodb connection error:"));
db.once('open', () => console.log("Mongo connection made"));

app.use(express.static(__dirname + '/build')); 

app.use('/api', router); 

app.use(errors.notFound);
app.use(errors.serverError);

module.exports = app; 