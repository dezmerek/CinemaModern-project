import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { format } from 'date-fns';
import { pl } from 'date-fns/locale';
import '../../../Styles/layout/_MoviePreviewsDetail.scss';
import { BsPlayCircle } from 'react-icons/bs';

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
        {movieDetails && (
          <>
            <h1>{movieDetails.title}</h1>

            <div className="movie-previews-detail__info-first">
              <img
                src={`${process.env.REACT_APP_API_URL}/images/movieBanners/${movieDetails.mainBannerImage}`}
                alt="Main Banner"
              />
              <div>
                <div className="movie-previews-detail__info-short">
                  <h3>
                    {format(
                      new Date(movieDetails.releaseDatePoland),
                      'dd MMMM yyyy',
                      {
                        locale: pl,
                      }
                    )}
                  </h3>
                  <h3>{movieDetails.duration} min</h3>
                </div>
                <p>{movieDetails.description}</p>
                <div className="movie-previews-detail__long-info1">
                  <div className="movie-previews-detail__table">
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
                    <div className="movie-previews-detail__trailer">
                      <img
                        src={`${process.env.REACT_APP_API_URL}/images/trailerBanners/${movieDetails.trailerBannerImage}`}
                        alt="Trailer Banner"
                      />
                      <BsPlayCircle />
                    </div>
                  </div>
                </div>{' '}
              </div>
            </div>
            <div className="movie-previews-detail__long-info2">
              <div className="movie-previews-detail__table">
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
                <div className="movie-previews-detail__trailer">
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
      </div>
    </div>
  );
};

export default MoviePreviewsDetail;
