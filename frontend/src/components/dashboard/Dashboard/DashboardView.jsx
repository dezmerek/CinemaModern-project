import React from 'react';
import '../../../Styles/layout/_Dashboard.scss';

const DashboardView = () => {
  return (
    <>
      <h2>Dashboard</h2>

      <div className="dashboard">
        <div className="dashboard__stats">
          <div className="dashboard__stat-box">
            <p>Sprzedanych biletów</p>
            <p className="dashboard__stat-box--30-last">Ostatnie 30 dni</p>
            <h1>2137</h1>
          </div>
          <div className="dashboard__stat-box">
            <p>Nowych filmów</p>
            <p className="dashboard__stat-box--30-last">Ostatnie 30 dni</p>
            <h1>2137</h1>
          </div>
          <div className="dashboard__stat-box">
            <p>Nowych użytkowników</p>
            <p className="dashboard__stat-box--30-last">Ostatnie 30 dni</p>
            <h1>2137</h1>
          </div>
          <div className="dashboard__stat-box">
            <p>Napisanych Rezenzji</p>
            <p className="dashboard__stat-box--30-last">Ostatnie 30 dni</p>
            <h1>2137</h1>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardView;
