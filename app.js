require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const cors = require('cors');
const { options } = require('./middlewares/cors');
const routes = require('./routes');
const err = require('./middlewares/errors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { limiter } = require('./utils/rateLimiter');

const app = express();
app.use(helmet());

const {
  PORT = 3005,
  NODE_ENV = 'develop',
  MONGO_ADDR = 'localhost',
  MONGO_PORT = '27017',
  DB_NAME = 'moviesdb',
} = process.env;

mongoose.connect(`mongodb://${MONGO_ADDR}:${MONGO_PORT}/${DB_NAME}`);

app.use('*', cors(options));

app.use(express.json());

app.use(requestLogger);

app.use(limiter);
app.use(routes);

app.use(errorLogger);
app.use(err);

app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
