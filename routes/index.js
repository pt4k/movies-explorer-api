const router = require('express').Router();
const { errors } = require('celebrate');
const { validateUserBody, validateAuthentication } = require('../middlewares/validatons');
const usersRouter = require('./users');
const moviesRouter = require('./movies');
const auth = require('../middlewares/auth');
const NotFoundError = require('../errors/NotFoundError');
const { login, createUser } = require('../controllers/users');

router.post('/signin', validateUserBody, login);
router.post('/signup', validateAuthentication, createUser);

router.use(auth);

router.use('/', usersRouter, moviesRouter);

router.use((req, res, next) => {
  next(new NotFoundError('Страница по указанному маршруту не найдена'));
});

router.use(errors());

module.exports = router;
