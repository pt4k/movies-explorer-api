const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 имнут
  max: 100, // Максимальное количество запросов за 15 минут
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = { limiter };
