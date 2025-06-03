import express from 'express';
import { adminOnly, userLoggedIn } from '../middleware/checkUserMiddleware.js';
import { createMovie, updateMovie, deleteMovie, createTvShow, updateTvShow, deleteTvShow } from '../controllers/AdminController.js';

const router = express.Router();

router.use(userLoggedIn,adminOnly);

// Movie routes
router.post('/movies', createMovie);
router.put('/movies/:id',  updateMovie);
router.delete('/movies/:id', deleteMovie);

// TV Show routes
router.post('/tvshows', createTvShow);
router.put('/tvshows/:id', updateTvShow);
router.delete('/tvshows/:id',  deleteTvShow);

export default router;
