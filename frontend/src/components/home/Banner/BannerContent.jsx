import React from 'react';
import { BsStar, BsPlay } from 'react-icons/bs';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';

const BannerContent = ({
  _id,
  genres,
  title,
  description,
  releaseDatePoland,
  duration,
  averageRating,
}) => {
  console.log('Average Rating:', averageRating);

  const formattedReleaseDate = releaseDatePoland
    ? format(new Date(releaseDatePoland), 'yyyy')
    : '';

  return (
    <div className="banner__content">
      {genres && genres.length > 0 && (
        <div className="banner__genre">
          {genres.map((g, index) => (
            <div key={index}>{g}</div>
          ))}
        </div>
      )}
      <h1>{title}</h1>
      <p>{description}</p>
      <div className="banner__info">
        {typeof averageRating === 'number' && (
          <h4>
            <BsStar /> {averageRating.toFixed(1)}{' '}
          </h4>
        )}

        <h4>{formattedReleaseDate}</h4>
        <h4>{duration} min</h4>
      </div>
      <div className="banner__buttons">
        <button>
          <Link to={`/polecane/${_id}`}>Szczegóły</Link>
        </button>
        <button>
          <BsPlay />
          Zwiastun
        </button>
      </div>
    </div>
  );
};

export default BannerContent;
