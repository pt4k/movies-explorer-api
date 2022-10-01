require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const cors = require('cors');
const { options } = require('./middlewares/cors');
const routes = require('./routes/index');
const err = require('./middlewares/errors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { limiter } = require('./utils/rateLimiter');

const app = express();
app.use(helmet());

const { PORT = 3005 } = process.env;

mongoose.connect('mongodb://localhost:27017/moviesdb');

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
