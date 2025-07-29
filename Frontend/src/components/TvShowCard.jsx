// 📁 src/components/MovieCard.jsx
import { useNavigate } from 'react-router-dom';

const MovieCard = ({ tvshow }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/tvshow/${tvshow._id}`);
  };

  return (
    <div className="card bg-base-100 w-96 shadow-sm cursor-pointer">
      <figure>
        <img
          src={tvshow.photo}
          alt={tvshow.title}
          className="h-60 w-full object-cover"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{tvshow.title}</h2>
        <p>{tvshow.description.slice(0, 100)}...</p>
        <div className="card-actions justify-end">
          <button onClick={handleClick} className="btn btn-primary">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
