import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BsArrowRight } from 'react-icons/bs';
import { format } from 'date-fns';
import '../../Styles/components/_MoviePreviews.scss';
import PreviewCard from './PreviewCard';

// ...
const MoviePreviews = () => {
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

        const topFourMovies = sortedMovies.slice(0, 4);
        setMovies(topFourMovies);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    }

    fetchMovies();
  }, []);

  return (
    <div className="movie-previews">
      <div className="movie-previews__container">
        <div className="movie-previews__head">
          <h2>Zapowiedzi</h2>
          <Link to="/" className="movie-previews__head--link">
            Zobacz więcej
            <BsArrowRight />
          </Link>
        </div>

        <div className="movie-previews__movies">
          {movies.map((movie) => (
            <PreviewCard
              key={movie._id}
              date={format(new Date(movie.releaseDatePoland), 'dd.MM')}
              title={movie.title}
              imagePath={`${process.env.REACT_APP_API_URL}/images/trailerBanners/${movie.trailerBannerImage}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MoviePreviews;
