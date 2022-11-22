// Массив доменов, с которых разрешены кросс-доменные запросы
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

module.exports = options;

module.exports = (req, res, next) => {
  const { origin } = req.headers; // Сохраняем источник запроса в переменную origin
  const { method } = req; // Сохраняем тип запроса (HTTP-метод) в соответствующую переменную

  // Значение для заголовка Access-Control-Allow-Methods по умолчанию (разрешены все типы запросов)
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

  // Если это предварительный запрос, добавляем нужные заголовки
  if (method === 'OPTIONS') {
  // разрешаем кросс-доменные запросы любых типов (по умолчанию)
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
  }

  // проверяем, что источник запроса есть среди разрешённых
  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }
  // устанавливаем заголовок, который разрешает браузеру запросы из любого источника
  res.header('Access-Control-Allow-Origin', '*');

  next();
};
