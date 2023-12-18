import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import '../../../Styles/components/_TrailerPlayer.scss';

const TrailerPlayer = ({ movieId, onClose }) => {
  const [trailerLink, setTrailerLink] = useState(null);

  useEffect(() => {
    const fetchTrailerLink = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/api/movies/${movieId}`
        );
        if (!response.ok) {
          throw new Error('Failed to fetch movie details');
        }

        const movieDetails = await response.json();
        setTrailerLink(movieDetails.trailerLink);
      } catch (error) {
        console.error('Error fetching trailer link:', error);
      }
    };

    fetchTrailerLink();
  }, [movieId]);

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains('trailer-overlay')) {
      onClose();
    }
  };

  return (
    <div className="trailer-overlay" onClick={handleOverlayClick}>
      <div className="trailer-overlay__container">
        {trailerLink && (
          <ReactPlayer
            className="trailer-overlay__player"
            url={trailerLink}
            controls
          />
        )}
        <button onClick={onClose}>Zamknij</button>
      </div>
    </div>
  );
};

export default TrailerPlayer;
