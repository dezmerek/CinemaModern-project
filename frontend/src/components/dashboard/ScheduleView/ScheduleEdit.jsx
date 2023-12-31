import React, { useState } from 'react';
import '../../../Styles/components/_UniversalEdit.scss';

const ScheduleEdit = ({ schedule, onSave, onCancel }) => {
  const [editedSchedule, setEditedSchedule] = useState({ ...schedule });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === 'date' || name === 'startTime' || name === 'endTime') {
      setEditedSchedule({ ...editedSchedule, [name]: value });
    } else {
      setEditedSchedule({
        ...editedSchedule,
        [name]: { ...editedSchedule[name], title: value },
      });
    }
  };

  const handleSave = async () => {
    try {
      const { date, startTime, endTime } = editedSchedule;

      const startTimeAsDate = new Date(`${date}T${startTime}:00.000Z`);
      const endTimeAsDate = new Date(`${date}T${endTime}:00.000Z`);

      const response = await fetch(
        `http://localhost:3001/api/schedules/${editedSchedule._id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            date,
            startTime: startTimeAsDate,
            endTime: endTimeAsDate,
          }),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to save changes');
      }

      onSave(editedSchedule);
    } catch (error) {
      console.error('Error saving changes:', error);
    }
  };

  return (
    <div className="universal-edit">
      <div className="universal-edit__content">
        <h3>Edycja seansu</h3>
        <form>
          <div>
            <label className="universal-edit__label">Film:</label>
            <input
              type="text"
              name="movie"
              value={editedSchedule.movie.title}
              onChange={handleInputChange}
              readOnly
            />
          </div>
          <div>
            <label className="universal-edit__label">Data:</label>
            <input
              type="date"
              name="date"
              value={editedSchedule.date}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className="universal-edit__label">
              Godzina rozpoczęcia:
            </label>
            <input
              type="time"
              name="startTime"
              value={editedSchedule.startTime}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className="universal-edit__label">
              Godzina zakończenia:
            </label>
            <input
              type="time"
              name="endTime"
              value={editedSchedule.endTime}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className="universal-edit__label">Sala:</label>
            <input
              type="text"
              name="hall"
              value={editedSchedule.hall.name}
              onChange={handleInputChange}
              readOnly
            />
          </div>
          <div className="universal-edit__buttons">
            <button type="button" onClick={handleSave}>
              Zapisz
            </button>
            <button type="button" onClick={onCancel}>
              Anuluj
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ScheduleEdit;
