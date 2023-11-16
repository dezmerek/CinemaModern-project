import React from 'react';

const DashboardStat = ({ title, subtitle, value }) => {
  return (
    <div className="dashboard__stat-box">
      <p>{title}</p>
      <p className="dashboard__stat-box--30-last">{subtitle}</p>
      <h1>{value}</h1>
    </div>
  );
};

export default DashboardStat;
