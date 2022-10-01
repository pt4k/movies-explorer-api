require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./routes/index');
const err = require('./middlewares/errors');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();

const { PORT = 3010 } = process.env;

mongoose.connect('mongodb://localhost:27017/moviesdb');

const options = {
  origin: [
    // 'http://pishchenko.mesto.students.nomoredomains.sbs',
    // 'https://pishchenko.mesto.students.nomoredomains.sbs',
    // 'http://api.pt4k.mesto.students.nomoredomains.sbs',
    // 'https://api.pt4k.mesto.students.nomoredomains.sbs',
    'localhost:3010',
  ],
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  preflightContinue: false,
  optionsSuccessStatus: 204,
  allowedHeaders: ['Content-Type', 'origin', 'Authorization'],
  credentials: true,
};

app.use('*', cors(options));

app.use(express.json());

app.use(requestLogger);
app.use(routes);
app.use(errorLogger);
app.use(err);

app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
