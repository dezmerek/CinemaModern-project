import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BsArrowRight } from 'react-icons/bs';
import '../../Styles/components/_MovieRecommended.scss';
import RecommendedCard from './RecommendedCard';

const MovieRecommended = () => {
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
        setRecommendedMovies(data);
      } catch (error) {
        console.error('Error fetching recommended movies:', error);
      }
    }

    fetchRecommendedMovies();
  }, []);

  return (
    <div className="recommended-videos">
      <div className="recommended-videos__container">
        <div className="recommended-videos__head">
          <h2>Polecane</h2>
          <Link to="/" className="recommended-videos__head--link">
            Zobacz więcej
            <BsArrowRight />
          </Link>
        </div>

        <div className="recommended-videos__movies">
          {recommendedMovies.map((movie) => (
            <RecommendedCard
              key={movie._id}
              title={movie.title}
              imagePath={`${process.env.REACT_APP_API_URL}/images/movieBanners/${movie.mainBannerImage}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieRecommended;
