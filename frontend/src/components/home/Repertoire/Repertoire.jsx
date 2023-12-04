import React, { useState } from 'react';
import '../../../Styles/layout/_Repertoire.scss';
import { format, addDays, startOfWeek } from 'date-fns';
import { Link } from 'react-router-dom';

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
    const clickedDate = addDays(startOfWeek(selectedDate), dayIndex);
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
  const startDate = startOfWeek(currentDate);

  const renderDayButtons = () => {
    const buttons = [];
    for (let i = 1; i < 7; i++) {
      const dayDate = addDays(startDate, i);
      buttons.push(
        <button
          key={i}
          onClick={() => handleDateClick(i)}
          className={
            format(selectedDate, 'yyyy-MM-dd') === format(dayDate, 'yyyy-MM-dd')
              ? 'active'
              : ''
          }
        >
          {format(dayDate, 'iiii\ndd.MM')}
        </button>
      );
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
                          <Link key={timeIndex} to={`/`}>
                            <span key={timeIndex}>
                              {timeSlot.startTime}{' '}
                              {timeIndex !== selectedMovies.length}
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
