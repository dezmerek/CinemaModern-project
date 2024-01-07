// AuthOptions.js
import React, { useState, useEffect } from 'react';
import { googleLogout } from '@react-oauth/google';
import LoggedInContent from './LoggedInContent';
import GoogleLogin from './GoogleLogin';
import './../../../Styles/components/_AuthOptions.scss';

const AuthOptions = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleGoogleAuth = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    // Wywołanie googleLogout bez oczekiwania na obietnicę
    googleLogout();
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <div className="auth-options">
      {user ? (
        <LoggedInContent user={user} handleLogout={handleLogout} />
      ) : (
        <>
          <h2>Moje e-kino</h2>
          <p>Proszę wybierz, czy chcesz się zalogować czy zarejestrować:</p>
          <div className="buttons-container">
            <GoogleLogin onGoogleLogin={handleGoogleAuth} />
          </div>
        </>
      )}
    </div>
  );
};

export default AuthOptions;
