import React from 'react';
import './../../../Styles/components/_UniversalPreview.scss';

const UserPreview = ({ user, onClose }) => {
  return (
    <div className="universal-preview">
      <div className="universal-preview__content">
        <h3>Podgląd użytkownika</h3>
        <p>ID: {user.id}</p>
        <p>Imię: {user.firstName}</p>
        <p>Nazwisko: {user.lastName}</p>
        <p>Rola: {user.role}</p>
        <p>Numer telefonu: {user.phoneNumber}</p>
        <button className="universal-preview__btn--close" onClick={onClose}>
          Zamknij
        </button>
      </div>
    </div>
  );
};

export default UserPreview;
