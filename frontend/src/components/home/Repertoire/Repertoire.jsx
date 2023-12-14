import React, { useState, useEffect } from 'react';
import '../../../Styles/layout/_Repertoire.scss';
import { format, addDays, startOfWeek } from 'date-fns';
import { Link } from 'react-router-dom';
import { pl } from 'date-fns/locale';
import { IoMdNotificationsOutline } from 'react-icons/io';
import { BsArrowRight } from 'react-icons/bs';

const Repertoire = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedMovies, setSelectedMovies] = useState([]);

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    const fetchScheduleForToday = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/api/schedules?date=${formatDate(
            selectedDate
          )}`
        );
        const data = await response.json();

        const schedulesForSelectedDate = data.map((entry) => ({
          movie: entry.movie.title,
          language: entry.movie.language,
          startTime: format(new Date(entry.startTime), 'HH:mm'),
          isPremiere: entry.movie.isPremiere,
        }));

        setSelectedMovies(schedulesForSelectedDate);
      } catch (error) {
        console.error('Error fetching schedule:', error);
      }
    };

    fetchScheduleForToday();
  }, [selectedDate]);

  const handleDateClick = async (dayIndex) => {
    const clickedDate = new Date(
      startOfWeek(selectedDate, { weekStartsOn: 1 })
    );
    clickedDate.setDate(clickedDate.getDate() + dayIndex);
    clickedDate.setHours(0, 0, 0, 0);

    setSelectedDate(clickedDate);

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/schedules?date=${formatDate(
          clickedDate
        )}`
      );

      const data = await response.json();

      const schedulesForSelectedDate = data.map((entry) => ({
        movie: entry.movie.title,
        language: entry.movie.language,
        startTime: format(new Date(entry.startTime), 'HH:mm'),
        isPremiere: entry.movie.isPremiere,
      }));

      setSelectedMovies(schedulesForSelectedDate);
    } catch (error) {
      console.error('Error fetching schedule:', error);
    }
  };

  const currentDate = new Date();
  const startDate = startOfWeek(currentDate, { weekStartsOn: 1 });

  const renderDayButtons = () => {
    const buttons = [];
    let isEvenColor = false;
    const daysOfWeek = [
      'poniedziałek',
      'wtorek',
      'środa',
      'czwartek',
      'piątek',
      'sobota',
      'niedziela',
    ];
    const todayIndex = daysOfWeek.indexOf(
      format(currentDate, 'iiii', { locale: pl })
    );

    for (let i = 0; i < 7; i++) {
      const dayIndex = (todayIndex + i) % 7; // Adjusted day index to start from today

      const dayDate = addDays(startDate, dayIndex);

      buttons.push(
        <button
          key={i}
          onClick={() => handleDateClick(dayIndex)}
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
    <div className="repertoire-view">
      <div className="repertoire-view__container">
        <div className="repertoire-view__head">
          <h2>Repertuar</h2>
          <Link to="/repertuar" className="repertoire-view__head--link">
            Zobacz więcej
            <BsArrowRight />
          </Link>
        </div>
        <div className="day-buttons">{renderDayButtons()}</div>
        <div>
          {selectedMovies.length > 0 ? (
            <table>
              <tbody>
                {Object.entries(
                  selectedMovies.reduce((acc, curr) => {
                    if (!acc[curr.movie]) {
                      acc[curr.movie] = {
                        language: curr.language,
                        times: [curr.startTime],
                        isPremiere: curr.isPremiere,
                      };
                    } else {
                      acc[curr.movie].times.push(curr.startTime);
                    }
                    return acc;
                  }, {})
                ).map(([movie, details], index) => (
                  <tr key={index}>
                    <td className="repertoire-view__movie-title">
                      <span>
                        {movie}
                        {details.isPremiere && <IoMdNotificationsOutline />}
                      </span>
                      <span>{details.language}</span>
                    </td>

                    <td className="repertoire-view__title">
                      {movie}
                      {details.isPremiere && <IoMdNotificationsOutline />}
                    </td>

                    <td className="repertoire-view__language">
                      {details.language}
                    </td>
                    <td className="repertoire-view__hours">
                      {details.times.map((time, timeIndex) => (
                        <Link
                          key={timeIndex}
                          to={`/`}
                          className="time-slot-link"
                        >
                          <span key={timeIndex}>
                            {time} {timeIndex !== details.times.length - 1}
                          </span>
                        </Link>
                      ))}
                    </td>
                  </tr>
                ))}
                <p className="repertoire-view__legend">
                  <IoMdNotificationsOutline /> - Premiera filmu
                </p>
              </tbody>
            </table>
          ) : (
            <p>Brak filmów na wybrany dzień.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Repertoire;
