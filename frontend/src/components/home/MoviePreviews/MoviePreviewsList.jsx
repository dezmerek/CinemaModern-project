import React, { useState, useEffect } from 'react';
import header from '../../../assets/images/header_1.png';
import { format } from 'date-fns';
import '../../../Styles/layout/_MoviePreviewsList.scss';
import PreviewCard from './PreviewCard';

const MoviePreviewsList = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function fetchMovies() {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/api/movies`
        );
        if (!response.ok) {
          throw new Error('Failed to fetch movies');
        }
        const data = await response.json();

        const previewMovies = data.filter((movie) => movie.isPreview);

        const sortedMovies = previewMovies.sort((a, b) => {
          const dateA = new Date(a.releaseDatePoland);
          const dateB = new Date(b.releaseDatePoland);
          return dateA - dateB;
        });

        setMovies(sortedMovies);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    }

    fetchMovies();
  }, []);

  return (
    <div className="movie-previews-list">
      <div className="movie-previews-list__container">
        <div className="movie-previews-list__header">
          <img src={header} alt="polityka prywatnosci" />
          <h2>Zapowiedzi</h2>
        </div>
        <div className="movie-previews-list__content">
          {movies.map((movie) => (
            <PreviewCard
              key={movie._id}
              date={format(new Date(movie.releaseDatePoland), 'dd.MM')}
              title={movie.title}
              imagePath={`${process.env.REACT_APP_API_URL}/images/trailerBanners/${movie.trailerBannerImage}`}
              movieId={movie._id}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MoviePreviewsList;
