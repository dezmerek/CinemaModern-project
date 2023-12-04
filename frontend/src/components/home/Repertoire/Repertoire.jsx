import React, { useState } from 'react';
import '../../../Styles/layout/_Repertoire.scss';
import { format, addDays, startOfWeek } from 'date-fns';
import { Link } from 'react-router-dom';
import { pl } from 'date-fns/locale';

const Repertoire = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedMovies, setSelectedMovies] = useState([]);

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

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
        isPremiere: entry.isPremiere,
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

    for (let i = 0; i < 7; i++) {
      const dayDate = addDays(startDate, i);

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
          <div>
            <span>{format(dayDate, 'dd.MM')}</span>
          </div>
          <div>
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
        <h2>Repertuar</h2>
        <div className="day-buttons">{renderDayButtons()}</div>
        <div>
          {selectedMovies.length > 0 ? (
            <table>
              <tbody>
                {selectedMovies.map((schedule, index) => (
                  <tr key={index}>
                    <td>{schedule.movie}</td>
                    <td>{schedule.language}</td>
                    <td>
                      {selectedMovies
                        .filter((s) => s.movie === schedule.movie)
                        .map((timeSlot, timeIndex) => (
                          <Link
                            key={timeIndex}
                            to={`/`}
                            className="time-slot-link"
                          >
                            <span key={timeIndex}>
                              {timeSlot.startTime}{' '}
                              {timeIndex !== selectedMovies.length - 1}
                            </span>
                          </Link>
                        ))}
                    </td>
                  </tr>
                ))}
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
