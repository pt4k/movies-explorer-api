const { celebrate, Joi } = require('celebrate');
const { urlRegExp } = require('../utils/urlRegExp');

const validateUserBody = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const validateAuthentication = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
  }),
});

const valedateUserData = celebrate({
  body: Joi.object().keys({
    email: Joi.string().min(2).max(30),
    name: Joi.string().min(2).max(30),
  }),
});

const validateMovieData = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required().min(2).max(30),
    director: Joi.string().required().min(2).max(30),
    duration: Joi.number().required(),
    year: Joi.string().required().min(2).max(4),
    description: Joi.string().required(),
    image: Joi.string().required().pattern(urlRegExp),
    trailerLink: Joi.string().pattern(urlRegExp),
    thumbnail: Joi.string().required().pattern(urlRegExp),
    nameRU: Joi.string().required().min(2).max(30),
    nameEN: Joi.string().required().min(2).max(30),
  }),
});

const validateMovieId = celebrate({
  params: Joi.object().keys({
    _id: Joi.string().alphanum().length(24),
  }),
});

module.exports = {
  validateUserBody, validateAuthentication, valedateUserData, validateMovieId, validateMovieData,
};
