import React from 'react';
import './../../../Styles/components/_UserPreview.scss';

const UserPreview = ({ user, onClose }) => {
  return (
    <div className="user-preview-overlay">
      <div className="user-preview-overlay__content">
        <h3>Podgląd użytkownika</h3>
        <p>ID: {user.id}</p>
        <p>Imię: {user.firstName}</p>
        <p>Nazwisko: {user.lastName}</p>
        <p>Rola: {user.role}</p>
        <p>Numer telefonu: {user.phoneNumber}</p>
        <button
          className="user-preview-overlay__content__close-button"
          onClick={onClose}
        >
          Zamknij
        </button>
      </div>
    </div>
  );
};

export default UserPreview;
