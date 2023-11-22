import React from 'react';
import { Link } from 'react-router-dom';

import { BsArrowRight, BsPlayCircle } from 'react-icons/bs';
import '../../Styles/components/_MoviePreviews.scss';
import MoviePreviewsIMG from '../../assets/images/temporary/MoviePreviews.png';

const MoviePreviews = () => {
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
          <div className="movie-previews__movie">
            <Link to="/" className="movie-previews__image">
              <img src={MoviePreviewsIMG} alt="previews" />
              <BsPlayCircle />
            </Link>
            <div className="movie-previews__info">
              <p>05.04</p>
              <h4>Air</h4>
            </div>
          </div>

          <div className="movie-previews__movie">
            <Link to="/" className="movie-previews__image">
              <img src={MoviePreviewsIMG} alt="previews" />
              <BsPlayCircle />
            </Link>
            <div className="movie-previews__info">
              <p>05.04</p>
              <h4>Air</h4>
            </div>
          </div>

          <div className="movie-previews__movie">
            <Link to="/" className="movie-previews__image">
              <img src={MoviePreviewsIMG} alt="previews" />
              <BsPlayCircle />
            </Link>
            <div className="movie-previews__info">
              <p>05.04</p>
              <h4>Air</h4>
            </div>
          </div>

          <div className="movie-previews__movie">
            <Link to="/" className="movie-previews__image">
              <img src={MoviePreviewsIMG} alt="previews" />
              <BsPlayCircle />
            </Link>
            <div className="movie-previews__info">
              <p>05.04</p>
              <h4>Air</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoviePreviews;
