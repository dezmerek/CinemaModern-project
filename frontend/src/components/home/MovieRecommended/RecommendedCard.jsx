import React from 'react';
import { Link } from 'react-router-dom';

const RecommendedCard = ({ movieId, title, imagePath }) => {
  return (
    <div className="movie-recommended__movie">
      <Link to={`/film/${movieId}`} className="movie-recommended__image">
        <img src={imagePath} alt="previews" />
      </Link>
      <div className="movie-recommended__info">
        <h4>{title}</h4>
      </div>
    </div>
  );
};

export default RecommendedCard;
