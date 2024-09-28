import express from 'express';
const router = express.Router();

router.get('/hi', (req, res) => {
    res.send('Welcome to the Moviecatalog API!');
})
export default router;