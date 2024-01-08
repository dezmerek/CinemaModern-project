// UserProfileStats.js
import React from 'react';

const UserProfileStats = ({ title, subtitle, value }) => {
  return (
    <div className="user-profile__stat-box">
      <p>{title}</p>
      <p className="user-profile__stat-box--30-last">{subtitle}</p>
      <h1>{value}</h1>
    </div>
  );
};

export default UserProfileStats;
