import express from 'express';
import { fetchMovies, fetchMovieById } from "../controllers/MovieController.js";

const router = express.Router();

router.get("/",fetchMovies);
router.get("/:id",fetchMovieById);

export default router;
