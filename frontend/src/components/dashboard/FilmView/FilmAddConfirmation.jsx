import React from 'react';
import '../../../Styles/components/_UniversalAddConfirmation.scss';

const FilmAddConfirmation = ({ onClose }) => {
  return (
    <div className="universal-confirmation">
      <div className="universal-confirmation__content">
        <p>Film został pomyślnie dodany!</p>
        <button
          className="universal-confirmation__btn--close"
          onClick={onClose}
        >
          Zamknij
        </button>
      </div>
    </div>
  );
};

export default FilmAddConfirmation;
