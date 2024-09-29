import express from 'express';
const router = express.Router();
import movieController from  '../../controllers/movieController.js';
router.post('/movies', movieController.addMovie)
router.get('/search/:title', movieController.searchMoviesByTitle)
router.get('/movies', movieController.getAllMovies);
router.get('/hi', (req, res) => {
    res.send('Welcome to the Moviecatalog API!');
})
export default router;