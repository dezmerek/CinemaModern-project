import React from 'react';
import DashboardStat from './DashboardStat';
import DashboardCard from './DashboardCard';
import '../../../Styles/layout/_Dashboard.scss';

const DashboardView = () => {
  const testData = [
    { movieID: 221, title: 'Aftersun', language: 'Polski', rating: 8.4 },
    { movieID: 222, title: 'Aftersun', language: 'Polski', rating: 8.4 },
    { movieID: 223, title: 'Aftersun', language: 'Polski', rating: 8.4 },
    { movieID: 224, title: 'Aftersun', language: 'Polski', rating: 8.4 },
    { movieID: 225, title: 'Aftersun', language: 'Polski', rating: 8.4 },
  ];

  const lastMovieColumns = [
    { label: 'ID', value: 'movieID' },
    { label: 'TYTUŁ', value: 'title' },
    { label: 'JĘZYK', value: 'language' },
    { label: 'OCENA', value: 'rating' },
  ];

  const topMovieColumns = [
    { label: 'ID', value: 'movieID' },
    { label: 'TYTUŁ', value: 'title' },
    { label: 'JĘZYK', value: 'language' },
    { label: 'OCENA', value: 'rating' },
  ];

  const lastReviewColumns = [
    { label: 'ID', value: 'movieID' },
    { label: 'TYTUŁ', value: 'title' },
    { label: 'JĘZYK', value: 'language' },
    { label: 'OCENA', value: 'rating' },
  ];

  const lastUserColumns = [
    { label: 'ID', value: 'movieID' },
    { label: 'TYTUŁ', value: 'title' },
    { label: 'JĘZYK', value: 'language' },
    { label: 'OCENA', value: 'rating' },
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
            title="Najnowsze filmy"
            buttonText="Wszystkie"
            data={testData}
            columns={lastMovieColumns}
          />

          <DashboardCard
            title="Najnowszy użytkownik"
            buttonText="Wszystkie"
            data={testData}
            columns={lastUserColumns}
          />

          <DashboardCard
            title="Najnowsze recenzje"
            buttonText="Wszystkie"
            data={testData}
            columns={lastReviewColumns}
          />

          <DashboardCard
            title="Najlepsze filmy"
            buttonText="Wszystkie"
            data={testData}
            columns={topMovieColumns}
          />
        </div>
      </div>
    </>
  );
};

export default DashboardView;
