import { create } from 'zustand';
import { axiosInstance } from '../lib/axios.js'; 

const useMovieStore = create((set) => ({
  movies: [],
  tvShows: [],
  movie: null,
  tvShow: null,
  loading: false,
  error: null,

  fetchMovies: async () => {
    set({ loading: true, error: null });
    try {
      const res = await axiosInstance.get('/movies'); // http://localhost:5000/api/movies
      set({ movies: res.data, loading: false });
    } catch (err) {
      console.error('Failed to fetch movies:', err);
      set({ error: 'Failed to fetch movies', loading: false });
    }
  },
  fetchMovieById: async (id) => {
    set({ loading: true, error: null });
    try {
      const res = await axiosInstance.get(`/movies/${id}`); // http://localhost:5000/api/movies/:id
      set({ movie: res.data, loading: false });
    } catch (err) {
      console.error('Failed to fetch movie:', err);
      set({ error: 'Failed to fetch movie', loading: false });
    }
  },
  fetchTvShows: async () => {
    set({ loading: true, error: null });
    try {
      const res = await axiosInstance.get('/tvshows'); // http://localhost:5000/api/tvshows
      set({ tvShows: res.data, loading: false });
    } catch (err) {
      console.error('Failed to fetch TV shows:', err);
      set({ error: 'Failed to fetch TV shows', loading: false });
    }
  },
  fetchTvShowById: async (id) => {
    set({ loading: true, error: null });
    try {
      const res = await axiosInstance.get(`/tvshows/${id}`); // http://localhost:5000/api/tvshows/:id
      set({ tvShow: res.data, loading: false });
    } catch (err) {
      console.error('Failed to fetch TV show:', err);
      set({ error: 'Failed to fetch TV show', loading: false });
    }
  },
}));

export default useMovieStore;