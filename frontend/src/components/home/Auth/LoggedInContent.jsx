// LoggedInContent.js
import React from 'react';

const LoggedInContent = ({ user, handleLogout }) => {
  return (
    <div className="logged-in-content">
      <h2>{user.displayName}</h2>
      <img src={user.picture} alt="Avatar profilowy" />
      <p>Email: {user.email}</p>
      <p>ID: {user.uid}</p>
      <button onClick={handleLogout}>Wyloguj się</button>
    </div>
  );
};

export default LoggedInContent;
