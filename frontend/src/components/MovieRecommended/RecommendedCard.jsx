import React from 'react';
import { Link } from 'react-router-dom';

const RecommendedCard = ({ date, title, imagePath }) => {
  return (
    <div className="recommended-videos__movie">
      <Link to="/" className="recommended-videos__image">
        <img src={imagePath} alt="previews" />
      </Link>
      <div className="recommended-videos__info">
        <h4>{title}</h4>
      </div>
    </div>
  );
};

export default RecommendedCard;
