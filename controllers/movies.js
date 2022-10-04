const Movie = require('../models/movie');
const NotFoundError = require('../errors/NotFoundError');
const ValidError = require('../errors/ValidError');
const NotAvailableError = require('../errors/NotAvailableError');

const createMovie = (req, res, next) => {
  Movie.create({ ...req.body, owner: req.user._id })
    .then((movie) => {
      res.status(201).send({ movie });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidError('Переданы некорректные данные при создании фильма.'));
      } else {
        next(err);
      }
    });
};

const getMovies = (req, res, next) => {
  Movie.find({})
    .then((movies) => {
      res.send(movies);
    })
    .catch(next);
};

const deleteMovie = (req, res, next) => {
  const movieId = req.params._id;
  const userId = req.user._id;

  Movie.findById(movieId)
    .orFail(() => {
      throw new NotFoundError('Фильм с указанным ID не найден.');
    })
    .then((movie) => {
      const movieOwner = movie.owner.toString().replace('new ObjectId("', '');

      if (userId !== movieOwner) {
        throw new NotAvailableError('Невозможно удалить фильм другого пользователя.');
      }

      return movie.remove()
        .then(() => res.send({ message: 'Фильм удален' }));
    })
    .catch((err) => {
      console.log(err);
      if (err.name === 'CastError') {
        next(new ValidError('Переданы некорректные данные для удаления фильма.'));
      } else {
        next(err);
      }
    });
};

module.exports = { createMovie, getMovies, deleteMovie };
