import express from 'express';
const router = express.Router();
import movieController from '../../controllers/movieController.js';
router.get('/stream/:movieId', movieController.streamMovie);
// router.get('/hi' , (req, res) =>{
//     res.send('Welcome to the Moviecatalog API!');
// })


export default router;