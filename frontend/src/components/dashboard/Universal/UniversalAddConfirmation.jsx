import React from 'react';
import '../../../Styles/components/_UniversalAddConfirmation.scss';

const UniversalAddConfirmation = ({ onClose, confirmationText }) => {
  return (
    <div className="universal-confirmation">
      <div className="universal-confirmation__content">
        <p>{confirmationText}</p>
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

export default UniversalAddConfirmation;
