import React from 'react';
import './../../../Styles/components/_UniversalPreview.scss';

const HallPreview = ({ hall, onClose }) => {
  return (
    <div className="universal-preview">
      <div className="universal-preview__content">
        <h3>Podgląd sali</h3>
        <p>ID: {hall.hallID}</p>
        <p>Data dodania: {hall.addedDate}</p>
        <button className="universal-preview__btn--close" onClick={onClose}>
          Zamknij
        </button>
      </div>
    </div>
  );
};

export default HallPreview;
