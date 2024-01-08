import React from 'react';
import { format } from 'date-fns';
import './../../../Styles/components/_UniversalPreview.scss';

const formatDate = (dateString, withTime = false) => {
  const date = new Date(dateString);
  if (!isNaN(date.getTime())) {
    return format(date, withTime ? 'yyyy-MM-dd HH:mm:ss' : 'yyyy-MM-dd');
  } else {
    return 'Invalid Date';
  }
};

const UserPreview = ({ user, onClose }) => {
  return (
    <div className="universal-preview">
      <div className="universal-preview__content">
        <h3>Podgląd użytkownika</h3>
        <p>ID: {user.userId}</p>
        <p>Imię i Nazwisko: {user.displayName}</p>
        <p>Email: {user.email}</p>
        <p>Numer telefonu: {user.phoneNumber}</p>
        <p>Data rejestracji: {formatDate(user.registrationDate, true)}</p>
        <p>Ostatnie logowanie: {formatDate(user.lastLoginDate, true)}</p>
        <p>Rola: {user.role}</p>
        <button className="universal-preview__btn--close" onClick={onClose}>
          Zamknij
        </button>
      </div>
    </div>
  );
};

export default UserPreview;
