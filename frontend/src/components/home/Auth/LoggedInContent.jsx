// LoggedInContent.js
import React from 'react';
import { Link } from 'react-router-dom';
import { BsJustify, BsCreditCard2Front } from 'react-icons/bs';

const LoggedInContent = ({ user, handleLogout, handleCloseAuthOptions }) => {
  const handleHideAuthOptions = () => {
    handleCloseAuthOptions(); // Przekazanie do rodzica informacji o zamknięciu AuthOptions
  };

  return (
    <div className="logged-in-content">
      <div className="logged-in-content__header">
        <img src={user.picture} alt="Avatar profilowy" />
        <button onClick={handleHideAuthOptions}>X</button>
      </div>
      <div>
        <h2>{user.displayName}</h2>
        <Link to="/edytuj">Edytuj profil</Link>
      </div>

      <div className="logged-in-content__menu">
        <Link className="logged-in-content__menu--link" to="/">
          <BsJustify />
          Moje zamówienia
        </Link>
        <Link className="logged-in-content__menu--link" to="/">
          <BsCreditCard2Front />
          Program lojalnościowy
        </Link>
      </div>

      <div className="logged-in-content__close">
        <button onClick={handleLogout}>Wyloguj się</button>
      </div>
    </div>
  );
};

export default LoggedInContent;
