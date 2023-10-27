import React from 'react';
import './../../../Styles/components/_UserPreview.scss';

const UserPreview = ({ user, onClose }) => {
  return (
    <div className="preview">
      <div className="preview__content">
        <h3>Podgląd filmu</h3>
        <p>ID: {user.id}</p>
        <p>Imię: {user.firstName}</p>
        <p>Nazwisko: {user.lastName}</p>
        <p>Rola: {user.role}</p>
        <p>Numer telefonu: {user.phoneNumber}</p>
        <button className="preview__btn-close" onClick={onClose}>
          Zamknij
        </button>
      </div>
    </div>
  );
};

export default UserPreview;
