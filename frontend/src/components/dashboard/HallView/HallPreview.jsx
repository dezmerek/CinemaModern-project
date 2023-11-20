import React from 'react';
import HallLayout from './HallLayout';
import './../../../Styles/components/_UniversalPreview.scss';

const HallPreview = ({ hall, onClose }) => {
  return (
    <div className="universal-preview">
      <div className="universal-preview__content">
        <h3>Podgląd sali</h3>
        <p>ID: {hall.hallID}</p>
        <p>Opis: {hall.description}</p>
        <p>Liczba miejsc: {hall.numberOfSeats}</p>
        <p>
          Rozmieszczenie:
          <HallLayout seatLayout={hall.seatLayout} />
        </p>
        <p>Data dodania: {hall.addedDate}</p>
        <button className="universal-preview__btn--close" onClick={onClose}>
          Zamknij
        </button>
      </div>
    </div>
  );
};

export default HallPreview;
