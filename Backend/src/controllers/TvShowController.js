import TvShow from "../models/tvShowModel.js";

export const fetchTvShows = async (req, res) => {
  try {
    const tvshow = await TvShow.find(); // .populate("comments") later to include comments, instead of id it will return the full comment object
    res.json(tvshow);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const fetchTvShowById = async (req, res) => {
  try {
    const tvshow = await TvShow.findById(req.params.id); // .populate("comments") later to include comments, instead of id it will return the full comment object
    if (!tvshow) return res.status(404).json({ message: "Movie not found" });
    res.json(tvshow);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
