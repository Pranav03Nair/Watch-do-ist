import React from 'react';
import type{ Movie } from '../types';

interface MovieCardProps {
  movie: Movie;
  onEdit: (movie: Movie) => void;
  onDelete: (movieId: string) => void;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, onEdit, onDelete }) => {
  const renderStars = (rating?: number) => {
    if (!rating) return null;
    const stars = [];
    for (let i = 1; i <= 10; i++) {
      stars.push(
        <span
          key={i}
          className={`text-sm ${
            i <= rating ? 'text-yellow-400' : 'text-gray-300'
          }`}
        >
          ★
        </span>
      );
    }
    return <div className="flex">{stars}</div>;
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative">
        <img
          src={movie.posterUrl}
          alt={movie.title}
          className="w-full h-64 object-cover"
        />
        <div className="absolute top-2 right-2">
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${
              movie.isWatched
                ? 'bg-green-100 text-green-800'
                : 'bg-yellow-100 text-yellow-800'
            }`}
          >
            {movie.isWatched ? 'Watched' : 'To Watch'}
          </span>
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-lg text-gray-900 mb-2">{movie.title}</h3>
        
        {movie.releaseYear && (
          <p className="text-sm text-gray-600 mb-2">Year: {movie.releaseYear}</p>
        )}

        {movie.genre && movie.genre.length > 0 && (
          <div className="mb-2">
            <div className="flex flex-wrap gap-1">
              {movie.genre.slice(0, 3).map((genre, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded"
                >
                  {genre}
                </span>
              ))}
              {movie.genre.length > 3 && (
                <span className="text-xs text-gray-500">+{movie.genre.length - 3} more</span>
              )}
            </div>
          </div>
        )}

        {movie.personalRating && (
          <div className="mb-2">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Rating:</span>
              {renderStars(movie.personalRating)}
              <span className="text-sm text-gray-600">({movie.personalRating}/10)</span>
            </div>
          </div>
        )}

        {movie.watchType && (
          <p className="text-sm text-gray-600 mb-2">
            Type: {movie.watchType === 'watch_again' ? 'Watch Again' : 'One Time'}
          </p>
        )}

        {movie.note && (
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">{movie.note}</p>
        )}

        <div className="flex space-x-2">
          <button
            onClick={() => onEdit(movie)}
            className="flex-1 bg-blue-600 text-white px-3 py-2 rounded text-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(movie._id)}
            className="flex-1 bg-red-600 text-white px-3 py-2 rounded text-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;