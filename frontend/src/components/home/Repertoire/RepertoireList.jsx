import React, { useState, useEffect, useCallback } from 'react';
import header from '../../../assets/images/header_4.png';
import '../../../Styles/layout/_RepertoireList.scss';
import { format, addDays } from 'date-fns';
import { pl } from 'date-fns/locale';
import { BsStar } from 'react-icons/bs';
import { Link } from 'react-router-dom';

const RepertoireList = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedMovies, setSelectedMovies] = useState([]);

  const handleDateClick = useCallback(async (dayIndex) => {
    const clickedDate = new Date();
    clickedDate.setDate(clickedDate.getDate() + dayIndex);
    clickedDate.setHours(0, 0, 0, 0);
    setSelectedDate(clickedDate);

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/schedules?date=${format(
          clickedDate,
          'yyyy-MM-dd'
        )}`
      );

      const data = await response.json();

      const uniqueMovies = [];
      for (const entry of data) {
        const existingMovie = uniqueMovies.find(
          (movie) => movie.title === entry.movie.title
        );

        if (!existingMovie) {
          const movieDetailsResponse = await fetch(
            `${process.env.REACT_APP_API_URL}/api/movies/${entry.movie._id}`
          );
          const movieDetails = await movieDetailsResponse.json();

          const ratingsResponse = await fetch(
            `${process.env.REACT_APP_API_URL}/api/movies/${entry.movie._id}/average-rating`
          );
          const averageRating = await ratingsResponse.json();

          const reviewsResponse = await fetch(
            `${process.env.REACT_APP_API_URL}/api/movies/${entry.movie._id}/reviews`
          );
          const reviews = await reviewsResponse.json();
          const formattedRating = averageRating.averageRating.toFixed(2);

          uniqueMovies.push({
            title: movieDetails.title,
            genre: movieDetails.genres.join(', '),
            duration: movieDetails.duration,
            language: movieDetails.language,
            rating: formattedRating,
            startTimes: [
              {
                time: format(new Date(entry.startTime), 'HH:mm'),
                scheduleId: entry._id,
              },
            ],
            isPremiere: movieDetails.isPremiere,
            reviews,
            mainBannerImage: `${process.env.REACT_APP_API_URL}/images/movieBanners/${movieDetails.mainBannerImage}`,
          });
        } else {
          existingMovie.startTimes.push({
            time: format(new Date(entry.startTime), 'HH:mm'),
            scheduleId: entry._id,
          });
        }
      }

      setSelectedMovies(uniqueMovies);
    } catch (error) {
      console.error('Error fetching schedule:', error);
    }
  }, []);

  useEffect(() => {
    handleDateClick(0);
  }, [handleDateClick]);
  const currentDate = new Date();

  const renderDayButtons = () => {
    const buttons = [];
    let isEvenColor = false;

    for (let i = 0; i < 7; i++) {
      const dayDate = addDays(currentDate, i);

      buttons.push(
        <button
          key={i}
          onClick={() => handleDateClick(i)}
          className={`${
            format(selectedDate, 'yyyy-MM-dd') === format(dayDate, 'yyyy-MM-dd')
              ? 'active'
              : ''
          } ${isEvenColor ? 'even-button' : 'odd-button'} ${
            i === 0 ? 'first-day' : ''
          }`}
        >
          <div className="repertoire-view__day-btn--date">
            <span>{format(dayDate, 'dd.MM')}</span>
          </div>
          <div className="repertoire-view__day-btn--day">
            <span>{format(dayDate, 'iiii', { locale: pl })}</span>
          </div>
        </button>
      );

      isEvenColor = !isEvenColor;
    }

    return buttons;
  };

  return (
    <div className="repertoire-list">
      <div className="repertoire-list__container">
        <div className="repertoire-list__header">
          <img src={header} alt="repertuar" />
          <h2>Repertuar</h2>
        </div>
        <div className="day-buttons">{renderDayButtons()}</div>
        <div>
          {selectedMovies.length > 0 ? (
            <>
              {selectedMovies.map((movie, index) => (
                <div key={movie._id || index}>
                  <div className="repertoire-list__info1">
                    <div className="repertoire-list__banner">
                      <img
                        src={movie.mainBannerImage}
                        alt={`Banner for ${movie.title}`}
                      />
                    </div>
                    <div className="repertoire-list__info">
                      <div className="repertoire-list__title-rate">
                        <span>
                          <h2>{movie.title}</h2>
                        </span>
                        <h2>
                          <BsStar />
                          {movie.rating}
                        </h2>
                      </div>
                      <div className="repertoire-list__title-rate">
                        {movie.genre}
                        <h3>{movie.duration} min</h3>
                      </div>

                      <div className="repertoire-list__btn">
                        {movie.startTimes.map((startTime, timeIndex) => (
                          <button key={timeIndex}>
                            <Link
                              to={{
                                pathname: `/kup-bilet/${startTime.scheduleId}`,
                                state: {
                                  id: startTime.scheduleId,
                                  movie: movie,
                                },
                              }}
                              key={timeIndex}
                            >
                              <p className="repertoire-list__btn--hour">
                                {startTime.time}
                              </p>
                              <p>{movie.language}</p>
                            </Link>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                  <hr />
                </div>
              ))}
            </>
          ) : (
            <p>Brak filmów na wybrany dzień.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default RepertoireList;
