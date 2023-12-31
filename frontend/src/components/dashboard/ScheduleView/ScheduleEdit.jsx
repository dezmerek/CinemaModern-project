import React, { useState } from 'react';
import '../../../Styles/components/_UniversalEdit.scss';

const ScheduleEdit = ({ schedule, onSave, onCancel }) => {
  const [editedSchedule, setEditedSchedule] = useState({ ...schedule });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedSchedule({ ...editedSchedule, [name]: value });
  };

  const handleSave = () => {
    onSave(editedSchedule);
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
              value={editedSchedule.movie}
              onChange={handleInputChange}
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
              value={editedSchedule.hall}
              onChange={handleInputChange}
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
