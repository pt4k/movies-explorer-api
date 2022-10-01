const router = require('express').Router();
const { validateMovieId, validateMovieData } = require('../middlewares/validatons');
const { getMovies, createMovie, deleteMovie } = require('../controllers/movies');

router.get('/movies', getMovies);
router.post('/movies', validateMovieData, createMovie);
router.delete('/movies/:_id', validateMovieId, deleteMovie);

module.exports = router;
