require('dotenv').config();
require('./config/database');
const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');

const app = express();

app.use(cors());
app.use(helmet());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(compression());

app.use(require('./src/routes/index.routes'));
app.use(require('./src/routes/user.routes'));
app.use(require('./src/routes/note.routes'));

module.exports = app;