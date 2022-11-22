require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const cors = require('cors');
const options = require('./middlewares/cors');
const routes = require('./routes');
const err = require('./middlewares/errors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { limiter } = require('./utils/rateLimiter');
const { PORT, mongoServer } = require('./utils/mongoConfig');

const app = express();
app.use(helmet());

mongoose.connect(mongoServer);

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
