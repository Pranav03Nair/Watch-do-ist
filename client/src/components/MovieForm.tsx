import React, { useState } from 'react';
import { moviesAPI } from '../services/api';
import type { Movie } from '../types';

interface MovieFormProps {
  movie?: Movie | null;
  onClose: () => void;
  onSubmit: (success: boolean) => void;
}

const MovieForm: React.FC<MovieFormProps> = ({ movie, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    title: movie?.title || '',
    note: movie?.note || '',
    genre: movie?.genre?.join(', ') || '',
    releaseYear: movie?.releaseYear || '',
    isWatched: movie?.isWatched || false,
    watchAt: movie?.watchAt || '',
    watchType: movie?.watchType || 'one_time' as 'one_time' | 'watch_again',
    personalRating: movie?.personalRating || '',
  });
  const [poster, setPoster] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({
        ...prev,
        [name]: checked
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPoster(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const movieFormData = new FormData();
      movieFormData.append('title', formData.title);
      if (formData.note) movieFormData.append('note', formData.note);
      if (formData.genre) movieFormData.append('genre', formData.genre);
      if (formData.releaseYear) movieFormData.append('releaseYear', formData.releaseYear.toString());
      movieFormData.append('isWatched', formData.isWatched.toString());
      if (formData.watchAt) movieFormData.append('watchAt', formData.watchAt);
      movieFormData.append('watchType', formData.watchType);
      if (formData.personalRating) movieFormData.append('personalRating', formData.personalRating.toString());
      
      if (poster) {
        movieFormData.append('poster', poster);
      }

      if (movie) {
        await moviesAPI.updateMovie(movie._id, movieFormData);
      } else {
        if (!poster) {
          setError('Poster image is required for new movies');
          setLoading(false);
          return;
        }
        await moviesAPI.createMovie(movieFormData);
      }

      onSubmit(true);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to save movie');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-900">
              {movie ? 'Edit Movie' : 'Add Movie'}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-2xl"
            >
              ×
            </button>
          </div>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                Title *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="poster" className="block text-sm font-medium text-gray-700 mb-1">
                Poster Image {!movie && '*'}
              </label>
              <input
                type="file"
                id="poster"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="genre" className="block text-sm font-medium text-gray-700 mb-1">
                Genres (comma separated)
              </label>
              <input
                type="text"
                id="genre"
                name="genre"
                value={formData.genre}
                onChange={handleInputChange}
                placeholder="Action, Drama, Comedy"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="releaseYear" className="block text-sm font-medium text-gray-700 mb-1">
                Release Year
              </label>
              <input
                type="number"
                id="releaseYear"
                name="releaseYear"
                value={formData.releaseYear}
                onChange={handleInputChange}
                min="1900"
                max="2030"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="isWatched"
                name="isWatched"
                checked={formData.isWatched}
                onChange={handleInputChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="isWatched" className="ml-2 block text-sm text-gray-700">
                Already watched
              </label>
            </div>

            <div>
              <label htmlFor="watchType" className="block text-sm font-medium text-gray-700 mb-1">
                Watch Type
              </label>
              <select
                id="watchType"
                name="watchType"
                value={formData.watchType}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="one_time">One Time</option>
                <option value="watch_again">Watch Again</option>
              </select>
            </div>

            <div>
              <label htmlFor="personalRating" className="block text-sm font-medium text-gray-700 mb-1">
                Personal Rating (1-10)
              </label>
              <input
                type="number"
                id="personalRating"
                name="personalRating"
                value={formData.personalRating}
                onChange={handleInputChange}
                min="1"
                max="10"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="watchAt" className="block text-sm font-medium text-gray-700 mb-1">
                Watch Date
              </label>
              <input
                type="date"
                id="watchAt"
                name="watchAt"
                value={formData.watchAt}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="note" className="block text-sm font-medium text-gray-700 mb-1">
                Notes
              </label>
              <textarea
                id="note"
                name="note"
                value={formData.note}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex space-x-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
              >
                {loading ? 'Saving...' : (movie ? 'Update' : 'Add')}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MovieForm;