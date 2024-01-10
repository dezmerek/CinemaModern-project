import React, { useEffect } from 'react';
import { googleLogout } from '@react-oauth/google';
import LoggedInContent from './LoggedInContent';
import GoogleLoginButton from './GoogleLoginButton';
import { useAuth } from './AuthContext';

const AuthOptions = ({ onAuthOptions, handleCloseAuthOptions }) => {
  const auth = useAuth();
  const { user, setUser } = auth;

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, [setUser]);

  const handleGoogleAuth = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    googleLogout();
    setUser(null);
    localStorage.removeItem('user');
  };

  const handleHideAuthOptions = () => {
    handleCloseAuthOptions();
  };

  return (
    <div className="auth-options">
      {user ? (
        <LoggedInContent
          user={user}
          handleLogout={handleLogout}
          handleCloseAuthOptions={handleCloseAuthOptions}
        />
      ) : (
        <>
          <div className="logged-in-content__header">
            <h2>Moje e-kino</h2>
            <button onClick={handleHideAuthOptions}>X</button>
          </div>
          <p>Zaloguj się lub utwórz konto, aby korzystać z naszych usług:</p>
          <div className="buttons-container">
            <GoogleLoginButton onGoogleLogin={handleGoogleAuth} />
          </div>
        </>
      )}
    </div>
  );
};

export default AuthOptions;
