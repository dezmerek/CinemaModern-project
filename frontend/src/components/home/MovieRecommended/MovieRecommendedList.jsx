import React, { useState, useEffect } from 'react';
import header from '../../../assets/images/header_5.png';
import '../../../Styles/layout/_MovieRecommendList.scss';
import RecommendedCard from './RecommendedCard';

const MovieRecommendList = () => {
  const [recommendedMovies, setRecommendedMovies] = useState([]);

  useEffect(() => {
    async function fetchRecommendedMovies() {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/api/movies`
        );
        if (!response.ok) {
          throw new Error('Failed to fetch recommended movies');
        }

        const data = await response.json();
        const recommendedMovies = data.filter((movie) => movie.isRecommended);

        setRecommendedMovies(recommendedMovies);
      } catch (error) {
        console.error('Error fetching recommended movies:', error);
      }
    }

    fetchRecommendedMovies();
  }, []);

  return (
    <div className="movie-recommend-list">
      <div className="movie-recommend-list__container">
        <div className="movie-recommend-list__header">
          <img src={header} alt="polityka prywatnosci" />
          <h2>Polecane</h2>
        </div>
        <div className="movie-recommend-list__content">
          {recommendedMovies.map((movie) => (
            <RecommendedCard
              key={movie._id}
              movieId={movie._id}
              title={movie.title}
              imagePath={`${process.env.REACT_APP_API_URL}/images/movieBanners/${movie.mainBannerImage}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieRecommendList;
