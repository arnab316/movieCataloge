import express from 'express';
const router = express.Router();
import movieController from  '../../controllers/movieController.js';
import { upload, handleFileUpload} from '../../middleware/handleFileUpload.js'
//* add Movie
router.post('/movies', upload.single('posterUrl'),handleFileUpload,movieController.addMovie)
router.get('/search/:title', movieController.searchMoviesByTitle)
router.get('/movies', movieController.getAllMovies);
// router.get('/stream/:movieId', movieController.streamMovie);

router.get('/hi', (req, res) => {
    res.send('Welcome to the Moviecatalog API!');
})
export default router;