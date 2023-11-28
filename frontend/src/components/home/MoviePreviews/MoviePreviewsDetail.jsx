import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { format } from 'date-fns';
import '../../../Styles/layout/_MoviePreviewsDetail.scss';
import { pl } from 'date-fns/locale';

const MoviePreviewsDetail = () => {
  const { id } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/api/movies/${id}`
        );
        if (!response.ok) {
          throw new Error('Failed to fetch movie details');
        }
        const data = await response.json();
        setMovieDetails(data);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    };

    fetchMovieDetails();
  }, [id]);

  return (
    <div className="movie-previews-detail">
      <div className="movie-previews-detail__container">
        <h1>{movieDetails.title}</h1>
        <p>{movieDetails.duration} min</p>
        {format(new Date(movieDetails.releaseDateWorld), 'dd MMMM yyyy', {
          locale: pl,
        })}

        <p>{movieDetails.description}</p>

        <>
          <img
            src={`${process.env.REACT_APP_API_URL}/images/trailerBanners/${movieDetails.trailerBannerImage}`}
            alt="Trailer Banner"
          />
          <img
            src={`${process.env.REACT_APP_API_URL}/images/movieBanners/${movieDetails.mainBannerImage}`}
            alt="Main Banner"
          />
        </>

        {movieDetails && (
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
                  {new Date(movieDetails.releaseDateWorld).toLocaleDateString()}
                  (Światowa premiera)
                </td>
                <td>
                  {new Date(
                    movieDetails.releaseDatePoland
                  ).toLocaleDateString()}
                  (Polska premiera kinowa)
                </td>
              </tr>
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default MoviePreviewsDetail;
