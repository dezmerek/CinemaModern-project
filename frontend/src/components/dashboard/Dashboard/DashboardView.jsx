import React, { useState, useEffect } from 'react';
import DashboardStat from './DashboardStat';
import DashboardCard from './DashboardCard';
import '../../../Styles/layout/_Dashboard.scss';

const DashboardView = () => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const [films, setFilms] = useState([]);
  const [users, setUsers] = useState([]);
  const [newMoviesCount, setNewMoviesCount] = useState(0);
  const [newUsersCount, setNewUsersCount] = useState(0);
  const [newReviewsCount, setNewReviewsCount] = useState(0);

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
    { label: 'ID', value: 'id' },
    { label: 'IMIĘ', value: 'firstName' },
    { label: 'NAZWISKO', value: 'lastName' },
    { label: 'DATA REJESTRACJI', value: 'createdAt' },
  ];

  useEffect(() => {
    async function fetchFilms() {
      try {
        const response = await fetch(`${apiUrl}/api/movies`);
        if (!response.ok) {
          throw new Error('Failed to fetch films');
        }
        const data = await response.json();

        const last30DaysFilms = data.filter((film) => {
          const filmDate = new Date(film.dateAdded);
          const thirtyDaysAgo = new Date();
          thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
          return filmDate >= thirtyDaysAgo;
        });

        setFilms(data);
        setNewMoviesCount(last30DaysFilms.length);
      } catch (error) {
        console.error('Error fetching films:', error);
      }
    }

    async function fetchUsers() {
      try {
        const response = await fetch(`${apiUrl}/api/users`);
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        const data = await response.json();

        const last30DaysUsers = data.filter((user) => {
          const userDate = new Date(user.createdAt);
          const thirtyDaysAgo = new Date();
          thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
          return userDate >= thirtyDaysAgo;
        });

        setUsers(data);
        setNewUsersCount(last30DaysUsers.length);
      } catch (error) {
        console.error('Error fetching films:', error);
      }
    }

    fetchFilms();
    fetchUsers();
  }, [apiUrl]);

  const getLatestMovies = (movies, limit = 5) => {
    const sortedMovies = movies.sort(
      (a, b) => new Date(b.dateAdded) - new Date(a.dateAdded)
    );
    return sortedMovies.slice(0, limit);
  };

  const getLatestUsers = (users, limit = 5) => {
    const sortedUsers = users.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
    const formattedUsers = sortedUsers.map((user) => ({
      ...user,
      createdAt: new Date(user.createdAt).toLocaleDateString(),
    }));
    return formattedUsers.slice(0, limit);
  };

  const latestMovies = getLatestMovies(films);
  const latestUsers = getLatestUsers(users);

  useEffect(() => {
    async function fetchReviews() {
      try {
        const response = await fetch(`${apiUrl}/api/movies/reviews`);
        if (!response.ok) {
          throw new Error('Failed to fetch reviews');
        }
        const data = await response.json();

        const last30DaysReviews = data.filter((review) => {
          const reviewDate = new Date(review.dateAdded);
          const thirtyDaysAgo = new Date();
          thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
          return reviewDate >= thirtyDaysAgo;
        });

        setNewReviewsCount(last30DaysReviews.length);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    }

    fetchReviews();
  }, [apiUrl]);

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
            value={newMoviesCount}
          />
          <DashboardStat
            title="Nowych użytkowników"
            subtitle="Ostatnie 30 dni"
            value={newUsersCount}
          />
          <DashboardStat
            title="Napisantch recenzji"
            subtitle="Ostatnie 30 dni"
            value={newReviewsCount}
          />
        </div>

        <div className="dashboard__cards">
          <DashboardCard
            title="Najnowsze filmy"
            buttonText="Wszystkie"
            data={latestMovies}
            columns={lastMovieColumns}
          />

          <DashboardCard
            title="Najnowszy użytkownik"
            buttonText="Wszystkie"
            data={latestUsers}
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
