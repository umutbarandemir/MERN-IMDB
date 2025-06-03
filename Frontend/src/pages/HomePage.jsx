// 📁 src/pages/HomePage.jsx
import { useEffect } from 'react';
import useMovieStore from '../store/useMovieStore.js';
import MovieCard from '../components/MovieCard.jsx';

const HomePage = () => {
  const { movies, fetchMovies, loading, error } = useMovieStore();

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-3xl font-bold">Hot Movies</h1>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <div className="flex flex-wrap gap-6">
        {movies.map((movie) => (
          <MovieCard key={movie._id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;