import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BsArrowRight } from 'react-icons/bs';
import { format } from 'date-fns';
import '../../../Styles/components/_MovieRecommended.scss';
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
        const recommendedMovies = data.filter((movie) => movie.isRecommended);
        const shuffledMovies = shuffleArray(recommendedMovies);
        const topSixMovies = shuffledMovies.slice(0, 6);

        setRecommendedMovies(topSixMovies);
      } catch (error) {
        console.error('Error fetching recommended movies:', error);
      }
    }

    fetchRecommendedMovies();
  }, []);

  const shuffleArray = (array) => {
    const shuffledArray = array.slice();
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }
    return shuffledArray;
  };

  return (
    <div className="movie-recommended">
      <div className="movie-recommended__container">
        <div className="movie-recommended__head">
          <h2>Polecane</h2>
          <Link to="/" className="movie-recommended__head--link">
            Zobacz więcej
            <BsArrowRight />
          </Link>
        </div>

        <div className="movie-recommended__movies">
          {recommendedMovies.map((movie) => (
            <RecommendedCard
              key={movie._id}
              date={format(new Date(movie.releaseDatePoland), 'dd.MM')}
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
