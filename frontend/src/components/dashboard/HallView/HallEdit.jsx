import React, { useState } from 'react';
import '../../../Styles/components/_UniversalEdit.scss';

const apiUrl = process.env.REACT_APP_API_URL;

const HallEdit = ({ hall, onSave, onCancel }) => {
  const [editedHall, setEditedHall] = useState(hall);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedHall({ ...editedHall, [name]: value });
  };

  const handleSave = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/halls/${editedHall._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedHall),
      });

      if (!response.ok) {
        throw new Error('Failed to save changes');
      }

      onSave(editedHall);
    } catch (error) {
      console.error('Error saving changes:', error);
    }
  };

  return (
    <div className="universal-edit">
      <div className="universal-edit__content">
        <h3>Edycja sali</h3>
        <form>
          <div>
            <label className="universal-edit__label">ID:</label>
            <input
              type="number"
              name="hallID"
              value={editedHall.hallID}
              onChange={handleInputChange}
              disabled
            />
          </div>
          <div>
            <label className="universal-edit__label">Nazwa sali:</label>
            <input
              type="text"
              name="name"
              value={editedHall.name}
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

export default HallEdit;
