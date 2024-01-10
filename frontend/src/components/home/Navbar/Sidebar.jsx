import React, { useEffect, useState } from 'react';
import logo from '../../../assets/images/logo.png';
import { Link } from 'react-router-dom';
import { BsJustify, BsCreditCard2Front } from 'react-icons/bs';
import { GoogleLogin, googleLogout } from '@react-oauth/google';

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

const Sidebar = ({ isOpen, menuItems }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user));
  }, [user]);

  const handleGoogleLogin = async (response) => {
    if (response && response.credential) {
      const base64Url = response.credential.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join('')
      );

      const decoded = JSON.parse(jsonPayload);
      const userData = {
        displayName: decoded.name,
        email: decoded.email,
        uid: decoded.sub,
        picture: decoded.picture,
      };

      console.log('Zalogowano przez Google:', userData);
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
    } else {
      console.error('Nieprawidłowa odpowiedź z Google:', response);
    }
  };

  const handleLoginFailure = (error) => {
    console.error('Błąd logowania przez Google:', error);
  };

  const handleLogout = () => {
    googleLogout();
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <div className={`navbar-sidebar ${isOpen ? 'is-open' : ''}`}>
      <Link to="/">
        <img src={logo} alt="logo" />
      </Link>
      <div className="navbar-sidebar__menu">
        {menuItems.map((item, index) => (
          <Link key={index} to={item.link}>
            {item.name}
          </Link>
        ))}
      </div>

      {user ? (
        <div className="logged-in-content">
          <div className="logged-in-content__header">
            <Link to="/profil">
              <img src={user.picture} alt="Avatar profilowy" />
            </Link>
            <button onClick={handleLogout}>X</button>
          </div>
          <div className="logged-in-content__menu-main">
            <h2>{user.displayName}</h2>
            <Link
              className="logged-in-content__menu-main--dashboard"
              to="/dashboard"
            >
              Dashboard
            </Link>
            <Link
              className="logged-in-content__menu-main--dashboard"
              to="/profil"
            >
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
      ) : (
        <div className="buttons-container">
          <GoogleLogin
            clientId={clientId}
            onSuccess={handleGoogleLogin}
            onFailure={handleLoginFailure}
            responseType="id_token"
          />
        </div>
      )}
    </div>
  );
};

export default Sidebar;
