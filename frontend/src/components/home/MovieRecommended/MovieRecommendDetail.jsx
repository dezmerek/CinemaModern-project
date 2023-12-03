import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { format } from 'date-fns';
import { pl } from 'date-fns/locale';
import '../../../Styles/components/_MovieRecommendedDetail.scss';
import MovieRecommendReview from './MovieRecommendReview';
import { BsStar, BsPlayCircle } from 'react-icons/bs';

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
    <div className="movie-recomended-detail">
      <div className="movie-recomended-detail__container">
        {movieDetails && (
          <>
            <h1>{movieDetails.title}</h1>

            <div className="movie-recomended-detail__info-first">
              <img
                src={`${process.env.REACT_APP_API_URL}/images/movieBanners/${movieDetails.mainBannerImage}`}
                alt="Main Banner"
              />
              <div>
                <div className="movie-recomended-detail__info-short">
                  {averageRating !== null && (
                    <h3>
                      <BsStar /> {averageRating.toFixed(1)}
                    </h3>
                  )}
                  <h3>
                    {format(new Date(movieDetails.releaseDatePoland), 'yyyy', {
                      locale: pl,
                    })}
                  </h3>
                  <h3>{movieDetails.duration} min</h3>
                </div>
                <div className="movie-recomended-detail__description1">
                  <p> {movieDetails.description}</p>
                </div>
                <div className="movie-recomended-detail__long-info1">
                  <div className="movie-recomended-detail__rating-buttons">
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
                  <div className="movie-recomended-detail__description">
                    <p> {movieDetails.description}</p>
                  </div>
                  <div className="movie-recomended-detail__table">
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
                          <th>gatunek</th>
                          <td>{movieDetails.genres.join(', ')}</td>
                        </tr>
                        <tr>
                          <th>premiera</th>
                          <td>
                            {new Date(
                              movieDetails.releaseDateWorld
                            ).toLocaleDateString()}{' '}
                            (Światowa premiera)
                          </td>
                        </tr>
                        <tr>
                          <th></th>
                          <td>
                            {new Date(
                              movieDetails.releaseDatePoland
                            ).toLocaleDateString()}{' '}
                            (Polska premiera kinowa)
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <div className="movie-recomended-detail__trailer">
                      <img
                        src={`${process.env.REACT_APP_API_URL}/images/trailerBanners/${movieDetails.trailerBannerImage}`}
                        alt="Trailer Banner"
                      />
                      <BsPlayCircle />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="movie-recomended-detail__long-info2">
              <div className="movie-recomended-detail__rating-buttons">
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
              <div className="movie-recomended-detail__table">
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
                      <th>gatunek</th>
                      <td>{movieDetails.genres.join(', ')}</td>
                    </tr>
                    <tr>
                      <th>premiera</th>
                      <td>
                        {new Date(
                          movieDetails.releaseDateWorld
                        ).toLocaleDateString()}{' '}
                        (Światowa premiera)
                      </td>
                    </tr>
                    <tr>
                      <th></th>
                      <td>
                        {new Date(
                          movieDetails.releaseDatePoland
                        ).toLocaleDateString()}{' '}
                        (Polska premiera kinowa)
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div className="movie-recomended-detail__trailer">
                  <img
                    src={`${process.env.REACT_APP_API_URL}/images/trailerBanners/${movieDetails.trailerBannerImage}`}
                    alt="Trailer Banner"
                  />
                  <BsPlayCircle />
                </div>
              </div>
            </div>
          </>
        )}
        <MovieRecommendReview />
      </div>
    </div>
  );
};

export default MovieRecommendDetail;
