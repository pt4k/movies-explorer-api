// Массив доменов, с которых разрешены кросс-доменные запросы
const options = {
  origin: [
    'http://movies.pishchenko.nomoredomains.icu',
    'https://movies.pishchenko.nomoredomains.icu',
    'http://api.movies.pishchenko.nomoredomains.icu',
    'https://api.movies.pishchenko.nomoredomains.icu',
    'localhost:3005',
    'localhost:3000',
  ],
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  preflightContinue: false,
  optionsSuccessStatus: 204,
  allowedHeaders: ['Content-Type', 'origin', 'authorization'],
  credentials: true,
};

module.exports = { options };
