import React, { useState, useEffect } from 'react';

const MovieRecommended = () => {
  const [movies, setMovies] = useState([]);
  const [previewMovies, setPreviewMovies] = useState([]);
  const [refreshKey, setRefreshKey] = useState(0);

  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    fetch(`${apiUrl}/api/movies`)
      .then((response) => response.json())
      .then((data) => {
        setMovies(data.filter((movie) => !movie.isRecommended));
        setPreviewMovies(data.filter((movie) => movie.isRecommended));
      })
      .catch((error) => console.error('Error fetching movies:', error));
  }, [apiUrl, refreshKey]);

  const moveMovieToPreview = async (movieId) => {
    try {
      const response = await fetch(`${apiUrl}/api/movies/${movieId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isRecommended: true }),
      });

      if (response.ok) {
        setMovies((prevMovies) =>
          prevMovies.map((movie) =>
            movie._id === movieId ? { ...movie, isRecommended: true } : movie
          )
        );

        setPreviewMovies((prev) => {
          const movedMovie = movies.find((movie) => movie._id === movieId);
          return [...prev, movedMovie];
        });

        setRefreshKey((prevKey) => prevKey + 1);
      } else {
        console.error('Failed to move movie to preview');
      }
    } catch (error) {
      console.error('Error moving movie to preview:', error);
    }
  };

  const removeFromPreview = async (movieId) => {
    try {
      const response = await fetch(`${apiUrl}/api/movies/${movieId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isRecommended: false }),
      });

      if (response.ok) {
        setMovies((prevMovies) =>
          prevMovies.map((movie) =>
            movie._id === movieId ? { ...movie, isRecommended: false } : movie
          )
        );

        setPreviewMovies((prev) =>
          prev.filter((movie) => movie._id !== movieId)
        );

        setRefreshKey((prevKey) => prevKey + 1);
      } else {
        console.error('Failed to remove movie from preview');
      }
    } catch (error) {
      console.error('Error removing movie from preview:', error);
    }
  };

  return (
    <div>
      <h2>Lista filmów</h2>
      <ul>
        {movies.map((movie) => (
          <li key={movie._id}>
            {movie.title}
            {!movie.isRecommended && (
              <button onClick={() => moveMovieToPreview(movie._id)}>
                Przenieś do polecanych
              </button>
            )}
          </li>
        ))}
      </ul>

      <h2>Filmy w zapowiedziach</h2>
      <ul>
        {previewMovies.map((movie) => (
          <li key={movie._id}>
            {movie.title} -
            <button onClick={() => removeFromPreview(movie._id)}>
              Usuń z zapowiedzi
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieRecommended;
