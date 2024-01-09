import React from 'react';
import { Link } from 'react-router-dom';
import { BsJustify, BsCreditCard2Front } from 'react-icons/bs';

const LoggedInContent = ({ user, handleLogout, handleCloseAuthOptions }) => {
  const handleHideAuthOptions = () => {
    handleCloseAuthOptions();
  };

  return (
    <div className="logged-in-content">
      <div className="logged-in-content__header">
        <Link to="/profil">
          <img src={user.picture} alt="Avatar profilowy" />
        </Link>
        <button onClick={handleHideAuthOptions}>X</button>
      </div>
      <div className="logged-in-content__menu-main">
        <h2>{user.displayName}</h2>
        {user.role === 'admin' && (
          <Link
            className="logged-in-content__menu-main--dashboard"
            to="/dashboard"
          >
            Dashboard
          </Link>
        )}
        <Link className="logged-in-content__menu-main--dashboard" to="/profil">
          Profil użytkownika
        </Link>
        <Link to="/edytuj">Edytuj profil</Link>
      </div>

      <div className="logged-in-content__menu">
        <Link className="logged-in-content__menu--link" to="/">
          <BsJustify />
          Moje zamówienia
        </Link>
        <Link
          className="logged-in-content__menu--link"
          to="/voucher-lojalnosciowy"
        >
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
