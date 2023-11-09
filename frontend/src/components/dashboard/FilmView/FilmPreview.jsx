import React from 'react';
import './../../../Styles/components/_UniversalPreview.scss';

const FilmPreview = ({ film, onClose }) => {
  return (
    <div className="universal-preview">
      <div className="universal-preview__content">
        <h3>Podgląd filmu</h3>
        <p>ID: {film.movieID}</p>
        <p>Tytuł: {film.title}</p>
        <p>Ocena: {film.rating}</p>
        <p>Język: {film.language}</p>
        <p>Bilety: {film.tickets}</p>
        <p>Data dodania: {film.dateAdded}</p>
        <button className="universal-preview__btn--close" onClick={onClose}>
          Zamknij
        </button>
      </div>
    </div>
  );
};

export default FilmPreview;
