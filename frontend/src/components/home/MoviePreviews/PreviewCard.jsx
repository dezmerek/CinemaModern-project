import React from 'react';
import { Link } from 'react-router-dom';
import { BsPlayCircle } from 'react-icons/bs';

const PreviewCard = ({ date, title, imagePath, movieId }) => {
  return (
    <div className="movie-previews__movie">
      <Link to={`/zapowiedz/${movieId}`} className="movie-previews__image">
        <img src={imagePath} alt="previews" />
        <BsPlayCircle />
      </Link>
      <div className="movie-previews__info">
        <p>{date}</p>
        <h4>{title}</h4>
      </div>
    </div>
  );
};

export default PreviewCard;
