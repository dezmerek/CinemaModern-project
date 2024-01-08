// UserProfileStats.js
import React from 'react';

const UserProfileStats = ({
  ticketsCount,
  ratingsCount,
  reviewsCount,
  transactionsCount,
}) => {
  return (
    <div className="user-profile-stats">
      <div className="user-profile-stats__item">
        <p>Zakupione bilety</p>
        <h1>{ticketsCount}</h1>
      </div>
      <div className="user-profile-stats__item">
        <p>Wystawione oceny</p>
        <h1>{ratingsCount}</h1>
      </div>
      <div className="user-profile-stats__item">
        <p>Napisane recenzje</p>
        <h1>{reviewsCount}</h1>
      </div>
      <div className="user-profile-stats__item">
        <p>Liczba transakcji</p>
        <h1>{transactionsCount}</h1>
      </div>
    </div>
  );
};

export default UserProfileStats;
