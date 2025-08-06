import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";

const useMovieStore = create((set) => ({
  movies: [],
  tvShows: [],
  hotmovies: [],
  hottvshows: [],
  movie: null,
  tvShow: null,
  loading: false,
  error: null,

  fetchMovies: async () => {
    set({ loading: true, error: null });
    try {
      const res = await axiosInstance.get("/movies"); // http://localhost:5000/api/movies
      set({ movies: res.data, loading: false });
    } catch (err) {
      console.error("Failed to fetch movies:", err);
      set({ error: "Failed to fetch movies", loading: false });
    }
  },

  fetchMovieById: async (id) => {
    set({ loading: true, error: null });
    try {
      const res = await axiosInstance.get(`/movies/${id}`); // http://localhost:5000/api/movies/:id
      set({ movie: res.data, loading: false });
    } catch (err) {
      console.error("Failed to fetch movie:", err);
      set({ error: "Failed to fetch movie", loading: false });
    }
  },
  fetchTvShows: async () => {
    set({ loading: true, error: null });
    try {
      const res = await axiosInstance.get("/tvshows"); // http://localhost:5000/api/tvshows
      set({ tvShows: res.data, loading: false });
    } catch (err) {
      console.error("Failed to fetch TV shows:", err);
      set({ error: "Failed to fetch TV shows", loading: false });
    }
  },
  fetchTvShowById: async (id) => {
    set({ loading: true, error: null });
    try {
      const res = await axiosInstance.get(`/tvshows/${id}`); // http://localhost:5000/api/tvshows/:id
      set({ tvShow: res.data, loading: false });
    } catch (err) {
      console.error("Failed to fetch TV show:", err);
      set({ error: "Failed to fetch TV show", loading: false });
    }
  },
  fetchHotMovies: async () => {
    set({ loading: true, error: null });
    try {
      const res = await axiosInstance.get("/movies/hotmovies"); // http://localhost:5000/api/movies/hotmovies
      set({ hotmovies: res.data, loading: false });
    } catch (err) {
      console.error("Failed to fetch hot movies:", err);
      set({ error: "Failed to fetch hot movies", loading: false });
    }
  },
  fetchHotTvShows: async () => {
    set({ loading: true, error: null });
    try {
      const res = await axiosInstance.get("/tvshows/hottvshows"); // http://localhost:5000/api/tvshows/hottvshows
      set({ hottvshows: res.data, loading: false });
    } catch (err) {
      console.error("Failed to fetch hot TV shows:", err);
      set({ error: "Failed to fetch hot TV shows", loading: false });
    }
  },
  rateTvShow: async (tvShowId, rating, userId) => {
    if (!userId) {
      throw new Error("User ID is required but undefined or null.");
    }

    try {
      const existingRatings = await axiosInstance.get(
        `/ratings/user/${userId}`
      );
      const existingRating = existingRatings.data.find(
        (r) => r.tvShowId === tvShowId
      );

      let response;

      if (existingRating) {
        response = await axiosInstance.put(`/ratings/${existingRating._id}`, {
          rate: rating,
        });
      } else {
        response = await axiosInstance.post("/ratings", {
          tvShowId,
          rate: rating,
        });
      }

      set((state) => ({
        tvShow: {
          ...state.tvShow,
          averageRating:
            response.data.newAverageRating || state.tvShow.averageRating,
          userRating: rating, // kullanıcı oyunu da ekledik
        },
      }));

      toast.success("Rating saved successfully!");
      return response.data;
    } catch (err) {
      console.error("Rating error:", err);
      toast.error(
        err.response?.data?.message || "Oy kaydedilirken hata oluştu."
      );
      throw err;
    }
  },
  rateMovie: async (movieId, rating, userId) => {
    if (!userId) {
      throw new Error("User ID is required but undefined or null.");
    }

    try {
      // Backend API, kullanıcı oylarını alıyor ve yeni ortalamayı döndürüyor varsayalım
      const existingRatings = await axiosInstance.get(
        `/ratings/user/${userId}`
      );
      const existingRating = existingRatings.data.find(
        (r) => r.movieId === movieId
      );

      let response;

      if (existingRating) {
        response = await axiosInstance.put(`/ratings/${existingRating._id}`, {
          rate: rating,
        });
      } else {
        response = await axiosInstance.post("/ratings", {
          movieId,
          rate: rating,
        });
      }

      set((state) => ({
        movie: {
          ...state.movie,
          averageRating:
            response.data.newAverageRating || state.movie.averageRating,
          userRating: rating,
        },
      }));

      toast.success("Rating saved successfully!");
      return response.data;
    } catch (err) {
      console.error("Rating error:", err);
      toast.error(
        err.response?.data?.message || "Oy kaydedilirken hata oluştu."
      );
      throw err;
    }
  },
}));

export default useMovieStore;
