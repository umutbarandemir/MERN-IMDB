import express from 'express';
import { fetchTvShows, fetchTvShowById } from "../controllers/tvShowController.js";

const router = express.Router();

router.get("/",fetchTvShows);
router.get("/:id",fetchTvShowById);

export default router;
