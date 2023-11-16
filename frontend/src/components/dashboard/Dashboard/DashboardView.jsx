import React from 'react';
import DashboardStat from './DashboardStat';
import DashboardCard from './DashboardCard';
import '../../../Styles/layout/_Dashboard.scss';

const DashboardView = () => {
  const reviewData = [
    { id: 221, title: 'Aftersun', language: 'Polski', rating: 8.4 },
    { id: 221, title: 'Aftersun', language: 'Polski', rating: 8.4 },
    { id: 221, title: 'Aftersun', language: 'Polski', rating: 8.4 },
    { id: 221, title: 'Aftersun', language: 'Polski', rating: 8.4 },
    { id: 221, title: 'Aftersun', language: 'Polski', rating: 8.4 },
  ];

  return (
    <>
      <h2>Dashboard</h2>

      <div className="dashboard">
        <div className="dashboard__stats">
          <DashboardStat
            title="Sprzedanych biletów"
            subtitle="Ostatnie 30 dni"
            value={2137}
          />
          <DashboardStat
            title="Nowych filmów"
            subtitle="Ostatnie 30 dni"
            value={2137}
          />
          <DashboardStat
            title="Nowych użytkowników"
            subtitle="Ostatnie 30 dni"
            value={2137}
          />
          <DashboardStat
            title="Napisantch recenzji"
            subtitle="Ostatnie 30 dni"
            value={2137}
          />
        </div>

        <div className="dashboard__cards">
          <DashboardCard
            title="Ostatnia recenzja"
            buttonText="Wszystkie"
            data={reviewData}
          />

          <DashboardCard
            title="Ostatnia recenzja"
            buttonText="Wszystkie"
            data={reviewData}
          />

          <DashboardCard
            title="Ostatnia recenzja"
            buttonText="Wszystkie"
            data={reviewData}
          />

          <DashboardCard
            title="Ostatnia recenzja"
            buttonText="Wszystkie"
            data={reviewData}
          />
        </div>
      </div>
    </>
  );
};

export default DashboardView;
