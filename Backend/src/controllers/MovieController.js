import Movie from "../models/movieModel.js";

export const fetchMovies = async (req, res) => {
  try {
    const movies = await Movie.find(); // .populate("comments") later to include comments, instead of id it will return the full comment object
    res.json(movies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const fetchMovieById = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id); // .populate("comments") later to include comments, instead of id it will return the full comment object
    if (!movie) return res.status(404).json({ message: "Movie not found" });
    res.json(movie);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
