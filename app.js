require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const cors = require('cors');
// const { options } = require('./middlewares/cors');
const routes = require('./routes');
const err = require('./middlewares/errors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { limiter } = require('./utils/rateLimiter');
const { PORT, mongoServer } = require('./utils/mongoConfig');

const app = express();
app.use(helmet());

mongoose.connect(mongoServer);

const options = {
  origin: [
    'http://movies.pishchenko.nomoredomains.icu',
    'https://movies.pishchenko.nomoredomains.icu',
    'http://api.movies.pishchenko.nomoredomains.icu',
    'https://api.movies.pishchenko.nomoredomains.icu',
    'http://localhost:3005',
    'https://localhost:3005',
    'http://localhost:3000',
    'https://localhost:3000',
  ],
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  preflightContinue: false,
  optionsSuccessStatus: 204,
  allowedHeaders: ['Content-Type', 'origin', 'authorization'],
  credentials: true,
};

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
