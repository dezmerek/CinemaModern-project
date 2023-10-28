import React from 'react';
import './../../../Styles/components/_Preview.scss';

const FilmPreview = ({ item, onClose }) => {
  return (
    <div className="preview">
      <div className="preview__content">
        <h3>Podgląd filmu</h3>
        <p>ID: {item.id}</p>
        <p>Tytuł: {item.title}</p>
        <p>Ocena: {item.rating}</p>
        <p>Język: {item.language}</p>
        <p>Bilety: {item.tickets}</p>
        <p>Data dodania: {item.dateAdded}</p>
        <button className="preview__btn-close" onClick={onClose}>
          Zamknij
        </button>
      </div>
    </div>
  );
};

export default FilmPreview;
