import React, { useState } from 'react';
import '../../../Styles/components/_UniversalEdit.scss';

const FilmEdit = ({ film, onSave, onCancel }) => {
  const [editedFilm, setEditedFilm] = useState(film);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedFilm({ ...editedFilm, [name]: value });
  };

  const handleSave = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/movies/${editedFilm._id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(editedFilm),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to save changes');
      }

      onSave(editedFilm);
    } catch (error) {
      console.error('Error saving changes:', error);
    }
  };
  return (
    <div className="universal-edit">
      <div className="universal-edit__content">
        <h3>Edycja użytkownika</h3>
        <form>
          <div>
            <label className="universal-edit__label">ID:</label>
            <input
              type="number"
              name="movieID"
              value={editedFilm.movieID}
              onChange={handleInputChange}
              disabled
            />
          </div>
          <div>
            <label className="universal-edit__label">Tytuł:</label>
            <input
              type="text"
              name="title"
              value={editedFilm.title}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className="universal-edit__label">Opis:</label>
            <input
              type="text"
              name="description"
              value={editedFilm.description}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className="universal-edit__label">Język:</label>
            <input
              type="text"
              name="language"
              value={editedFilm.language}
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

export default FilmEdit;
