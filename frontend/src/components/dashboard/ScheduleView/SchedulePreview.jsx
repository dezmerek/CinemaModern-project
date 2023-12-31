import React from 'react';
import './../../../Styles/components/_UniversalPreview.scss';

const SchedulePreview = ({ schedule, onClose }) => {
  return (
    <div className="universal-preview">
      <div className="universal-preview__content">
        <h3>Podgląd seansu</h3>
        <p>Film: {schedule['movie.title']}</p>
        <p>Data: {schedule.date}</p>
        <p>Godzina rozpoczęcia: {schedule.startTime}</p>
        <p>Godzina zakończenia: {schedule.endTime}</p>
        <p>Sala: {schedule['hall.name']}</p>
        <button className="universal-preview__btn--close" onClick={onClose}>
          Zamknij
        </button>
      </div>
    </div>
  );
};

export default SchedulePreview;
