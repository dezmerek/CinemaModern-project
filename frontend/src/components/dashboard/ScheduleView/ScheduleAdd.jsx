import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import '../../../Styles/layout/_ScheduleAdd.scss';

const ScheduleAdd = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState('');
  const [date, setDate] = useState('');
  const [halls, setHalls] = useState([]);
  const [selectedHall, setSelectedHall] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [isPremiere, setIsPremiere] = useState(false);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/api/movies`)
      .then((response) => response.json())
      .then((data) => setMovies(data))
      .catch((error) => console.error('Error fetching movies:', error));

    fetch(`${process.env.REACT_APP_API_URL}/api/halls`)
      .then((response) => response.json())
      .then((data) => setHalls(data))
      .catch((error) => console.error('Error fetching halls:', error));
  }, []);

  const handleSaveSchedule = async () => {
    if (!selectedMovie || !date || !selectedHall || !startTime || !endTime) {
      alert('Proszę wypełnić wszystkie pola.');
      return;
    }

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/schedules`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            movie: selectedMovie,
            date,
            startTime: new Date(date + 'T' + startTime),
            endTime: new Date(date + 'T' + endTime),
            hall: selectedHall,
            isPremiere,
          }),
        }
      );

      if (response.status === 201) {
        alert('Schedule added successfully!');
      } else {
        alert('Failed to add schedule. Please try again.');
      }
    } catch (error) {
      console.error('Error adding schedule:', error);
      alert('Internal server error. Please try again later.');
    }
  };

  const generateTimeOptions = (stepMinutes) => {
    const options = [];
    const totalMinutesInDay = 24 * 60;

    for (let minutes = 0; minutes < totalMinutesInDay; minutes += stepMinutes) {
      const hour = Math.floor(minutes / 60)
        .toString()
        .padStart(2, '0');
      const minute = (minutes % 60).toString().padStart(2, '0');
      options.push(`${hour}:${minute}`);
    }

    return options;
  };

  const handleStartTimeChange = (selectedOption) => {
    setStartTime(selectedOption.label);
  };

  const handleEndTimeChange = (selectedOption) => {
    setEndTime(selectedOption.label);
  };

  const customStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: 'rgb(21, 31, 48)',
      color: 'white',
      border: 'none',
      borderRadius: '10px',
      padding: '0.23rem',
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused
        ? 'rgb(44, 127, 237)'
        : 'rgb(21, 31, 48)',
      color: 'white',
    }),
    placeholder: (provided) => ({
      ...provided,
      color: 'white',
    }),
    singleValue: (provided) => ({
      ...provided,
      color: 'white',
    }),
  };

  return (
    <div className="schedule-add">
      <h2>Utwórz seans</h2>
      <div className="schedule-add__container">
        <form>
          <div className="schedule-add__movie">
            <label>Wybierz film</label>
            <Select
              styles={customStyles}
              value={movies.find((movie) => movie.title === selectedMovie)}
              options={movies.map((movie) => ({
                value: movie._id,
                label: movie.title,
              }))}
              onChange={(selectedOption) =>
                setSelectedMovie(selectedOption.value)
              }
              isSearchable
              placeholder="---"
            />
          </div>
          <div className="schedule-add__hours">
            <div className="schedule-add__hour-start">
              <label>Godzina rozpoczęcia</label>
              <Select
                styles={customStyles}
                value={generateTimeOptions(10).find(
                  (option) => option.label === startTime
                )}
                options={generateTimeOptions(10).map((time) => ({
                  value: time,
                  label: time,
                }))}
                onChange={handleStartTimeChange}
                isSearchable
                placeholder="---"
              />
            </div>
            <div className="schedule-add__hour-end">
              <label>Godzina zakończenia</label>
              <Select
                styles={customStyles}
                value={generateTimeOptions(10).find(
                  (option) => option.label === endTime
                )}
                options={generateTimeOptions(10).map((time) => ({
                  value: time,
                  label: time,
                }))}
                onChange={handleEndTimeChange}
                isSearchable
                placeholder="---"
              />
            </div>
          </div>
          <div className="schedule-add__hall">
            <label>Wybierz salę</label>
            <Select
              styles={customStyles}
              value={halls.find((hall) => hall.title === selectedHall)}
              options={halls.map((hall) => ({
                value: hall._id,
                label: hall.name,
              }))}
              onChange={(selectedOption) =>
                setSelectedHall(selectedOption.value)
              }
              isSearchable
              placeholder="---"
            />
          </div>
          <div className="schedule-add__date">
            <label>Data</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <div className="schedule-add__premiere">
            <label>Premiera</label>
            <input
              type="checkbox"
              checked={isPremiere}
              onChange={() => setIsPremiere(!isPremiere)}
            />
          </div>
          <button
            className="film-add__btn-save"
            type="button"
            onClick={handleSaveSchedule}
          >
            Zapisz seans
          </button>
        </form>
      </div>
    </div>
  );
};

export default ScheduleAdd;
