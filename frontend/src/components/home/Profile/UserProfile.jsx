import React, { useEffect } from 'react';
import { useAuth } from '../Auth/AuthContext';

const UserProfile = () => {
  const auth = useAuth();

  useEffect(() => {
    document.title = `CinemaModern - ${auth.user.displayName}`;
  }, [auth.user.displayName]);

  return (
    <div className="user-profile">
      <h2>Profil użytkownika</h2>
      {auth.user ? (
        <div>
          <img src={auth.user.picture} alt="Avatar profilowy" />
          <p>Imię i nazwisko: {auth.user.displayName}</p>
          <p>Email: {auth.user.email}</p>
        </div>
      ) : (
        <p>Nie jesteś zalogowany.</p>
      )}
    </div>
  );
};

export default UserProfile;
