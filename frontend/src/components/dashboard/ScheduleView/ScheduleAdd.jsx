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
  const [isPremiere, setIsPremiere] = useState(false); // Nowy stan dla informacji o premierze

  useEffect(() => {
    // Fetch the list of movies from the server
    fetch(`${process.env.REACT_APP_API_URL}/api/movies`)
      .then((response) => response.json())
      .then((data) => setMovies(data))
      .catch((error) => console.error('Error fetching movies:', error));

    // Fetch the list of halls from the server
    fetch(`${process.env.REACT_APP_API_URL}/api/halls`)
      .then((response) => response.json())
      .then((data) => setHalls(data))
      .catch((error) => console.error('Error fetching halls:', error));
  }, []);

  const handleSaveSchedule = async () => {
    // Perform validation before sending the request to the server
    if (!selectedMovie || !date || !selectedHall || !startTime || !endTime) {
      alert('Proszę wypełnić wszystkie pola.');
      return;
    }

    // Send the schedule data to the server
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
            isPremiere, // Dodaj informację o premierze
          }),
        }
      );

      if (response.status === 201) {
        alert('Schedule added successfully!');
        // You can perform additional actions, such as clearing the form or updating the schedule list
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
    setStartTime(selectedOption.label); // Pobierz etykietę z wybranej opcji
  };

  const handleEndTimeChange = (selectedOption) => {
    setEndTime(selectedOption.label); // Pobierz etykietę z wybranej opcji
  };

  return (
    <div className="schedule-add">
      <h2>Utwórz Harmonogram Seansów</h2>
      <form>
        <div>
          <label>Wybierz film:</label>
          <Select
            value={movies.find((movie) => movie._id === selectedMovie)}
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
        <div>
          <label>Data:</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div>
          <label>Godzina rozpoczęcia:</label>
          <Select
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
        <div>
          <label>Godzina zakończenia:</label>
          <Select
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
        <div>
          <label>Premiera:</label>
          <input
            type="checkbox"
            checked={isPremiere}
            onChange={() => setIsPremiere(!isPremiere)}
          />
        </div>
        <div>
          <label>Wybierz salę:</label>
          <select
            value={selectedHall}
            onChange={(e) => setSelectedHall(e.target.value)}
          >
            <option value="" disabled>
              ---
            </option>
            {halls.map((hall) => (
              <option key={hall._id} value={hall._id}>
                {hall.name}
              </option>
            ))}
          </select>
        </div>
        <button type="button" onClick={handleSaveSchedule}>
          Zapisz Harmonogram
        </button>
      </form>
    </div>
  );
};

export default ScheduleAdd;
