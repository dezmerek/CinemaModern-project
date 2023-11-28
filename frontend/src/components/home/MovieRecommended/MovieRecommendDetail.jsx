import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { format } from 'date-fns';
import { pl } from 'date-fns/locale';
import '../../../Styles/components/_MovieRecommended.scss';
import MovieRecommendReview from './MovieRecommendReview';

const MovieRecommendDetail = () => {
  const [movieDetails, setMovieDetails] = useState(null);
  const [averageRating, setAverageRating] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        const movieResponse = await fetch(
          `${process.env.REACT_APP_API_URL}/api/movies/${id}`
        );

        if (!movieResponse.ok) {
          throw new Error('Failed to fetch movie details');
        }

        const movieData = await movieResponse.json();
        setMovieDetails(movieData);

        const averageRatingResponse = await fetch(
          `${process.env.REACT_APP_API_URL}/api/movies/${id}/average-rating`
        );

        if (!averageRatingResponse.ok) {
          throw new Error('Failed to fetch average rating');
        }

        const averageRatingData = await averageRatingResponse.json();
        setAverageRating(averageRatingData.averageRating);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchMovieData();
  }, [id]);

  const handleRatingClick = async (rating) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/movies/${id}/rate`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ rating }),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to submit rating');
      }

      const updatedResponse = await fetch(
        `${process.env.REACT_APP_API_URL}/api/movies/${id}`
      );

      if (!updatedResponse.ok) {
        throw new Error('Failed to fetch updated movie details');
      }

      const updatedData = await updatedResponse.json();
      setMovieDetails(updatedData);
    } catch (error) {
      console.error('Error submitting rating:', error);
    }
  };

  return (
    <div className="movie-previews-detail">
      <div className="movie-previews-detail__container">
        {movieDetails && (
          <>
            <h1>{movieDetails.title}</h1>

            <img
              src={`${process.env.REACT_APP_API_URL}/images/movieBanners/${movieDetails.mainBannerImage}`}
              alt="Main Banner"
            />

            {averageRating !== null && (
              <p>Średnia: {averageRating.toFixed(1)}</p>
            )}

            <p>
              {format(
                new Date(movieDetails.releaseDatePoland),
                'dd MMMM yyyy',
                { locale: pl }
              )}
            </p>
            <p>{movieDetails.duration} min</p>
            <p>{movieDetails.description}</p>

            <table>
              <tbody>
                <tr>
                  <th>reżyseria</th>
                  <td>{movieDetails.director}</td>
                </tr>
                <tr>
                  <th>scenariusz</th>
                  <td>{movieDetails.writer}</td>
                </tr>
                <tr>
                  <th>premiera</th>
                  <td>
                    {new Date(
                      movieDetails.releaseDateWorld
                    ).toLocaleDateString()}{' '}
                    (Światowa premiera)
                  </td>
                  <td>
                    {new Date(
                      movieDetails.releaseDatePoland
                    ).toLocaleDateString()}{' '}
                    (Polska premiera kinowa)
                  </td>
                </tr>
              </tbody>
            </table>

            <img
              src={`${process.env.REACT_APP_API_URL}/images/trailerBanners/${movieDetails.trailerBannerImage}`}
              alt="Trailer Banner"
            />

            <div className="rating-buttons">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((rating) => (
                <div
                  key={rating}
                  onClick={() => handleRatingClick(rating)}
                  className={`rating-button`}
                >
                  {rating}
                </div>
              ))}
            </div>
          </>
        )}
        <MovieRecommendReview />
      </div>
    </div>
  );
};

export default MovieRecommendDetail;
