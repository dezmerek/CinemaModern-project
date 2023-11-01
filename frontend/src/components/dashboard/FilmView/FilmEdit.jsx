import React, { useState } from 'react';
import '../../../Styles/components/_UniversalEdit.scss';

const FilmEdit = ({ film, onSave, onCancel }) => {
  const [editedFilm, setEditedFilm] = useState(film);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedFilm({ ...editedFilm, [name]: value });
  };

  const handleSave = () => {
    onSave(editedFilm);
  };

  return (
    <div className="universal-edit">
      <div className="universal-edit__content">
        <h3>Edycja użytkownika</h3>
        <form>
          <div>
            <label className="universal-edit__label">ID:</label>
            <input
              type="text"
              name="id"
              value={editedFilm.id}
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
            <label className="universal-edit__label">Ocena:</label>
            <input
              type="text"
              name="rating"
              value={editedFilm.rating}
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
          <div>
            <label className="universal-edit__label">Bilety:</label>
            <input
              type="text"
              name="tickets"
              value={editedFilm.tickets}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className="universal-edit__label">Data dodania:</label>
            <input
              type="date"
              name="dateAdded"
              value={editedFilm.dateAdded}
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
