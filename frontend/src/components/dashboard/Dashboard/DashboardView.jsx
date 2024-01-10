import React, { useState, useEffect } from 'react';
import DashboardStat from './DashboardStat';
import DashboardCard from './DashboardCard';
import '../../../Styles/layout/_Dashboard.scss';
import format from 'date-fns/format';

const DashboardView = () => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const [films, setFilms] = useState([]);
  const [users, setUsers] = useState([]);
  const [newMoviesCount, setNewMoviesCount] = useState(0);
  const [newUsersCount, setNewUsersCount] = useState(0);
  const [newReviewsCount, setNewReviewsCount] = useState(0);
  const [soldTickets, setSoldTickets] = useState([]);
  const [latestReviews, setLatestReviews] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);

  const lastMovieColumns = [
    { label: 'ID', value: 'movieID' },
    { label: 'TYTUŁ', value: 'title' },
    { label: 'JĘZYK', value: 'language' },
    { label: 'OCENA', value: 'averageRating' },
  ];

  const topMovieColumns = [
    { label: 'ID', value: 'movieID' },
    { label: 'TYTUŁ', value: 'title' },
    { label: 'JĘZYK', value: 'language' },
    { label: 'OCENA', value: 'averageRating' },
  ];

  const lastReviewColumns = [
    { label: 'ID', value: 'reviewID' },
    { label: 'TYTUŁ', value: 'movieTitle' },
    { label: 'UŻYTKOWNIK', value: 'userDisplayName' },
    { label: 'DATA', value: 'dateAdded' },
  ];

  const lastUserColumns = [
    { label: 'ID', value: 'userId' },
    { label: 'IMIĘ i NAZWISKO', value: 'displayName' },
    { label: 'AKTYWNOŚĆ', value: 'lastLoginDate' },
    { label: 'REJESTRACJA', value: 'registrationDate' },
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
          const userDate = new Date(user.registrationDate);
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

  useEffect(() => {
    async function fetchLatestMovies() {
      try {
        const response = await fetch(`${apiUrl}/api/movies`);
        if (!response.ok) {
          throw new Error('Failed to fetch movies');
        }
        const data = await response.json();

        const moviesWithRatings = await Promise.all(
          data.map(async (movie) => {
            const ratingResponse = await fetch(
              `${apiUrl}/api/movies/${movie._id}/average-rating`
            );
            if (!ratingResponse.ok) {
              throw new Error('Failed to fetch movie rating');
            }
            const ratingData = await ratingResponse.json();

            return {
              ...movie,
              averageRating: ratingData.averageRating,
            };
          })
        );

        const sortedMovies = moviesWithRatings.sort(
          (a, b) => new Date(b.dateAdded) - new Date(a.dateAdded)
        );

        const latestMoviesWithRatings = sortedMovies.slice(0, 5);

        setFilms(latestMoviesWithRatings);
        setNewMoviesCount(latestMoviesWithRatings.length);
      } catch (error) {
        console.error('Error fetching latest movies with ratings:', error);
      }
    }

    fetchLatestMovies();
  }, [apiUrl]);

  const getLatestMovies = (movies, limit = 5) => {
    const sortedMovies = movies.sort(
      (a, b) => new Date(b.dateAdded) - new Date(a.dateAdded)
    );
    return sortedMovies.slice(0, limit);
  };

  const getLatestUsers = (users, limit = 5) => {
    const sortedUsers = users.sort(
      (a, b) => new Date(b.registrationDate) - new Date(a.registrationDate)
    );
    const formattedUsers = sortedUsers.map((user) => ({
      ...user,
      registrationDate: new Date(user.registrationDate).toLocaleDateString(),
      lastLoginDate: new Date(user.lastLoginDate).toLocaleDateString(),
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

  useEffect(() => {
    async function fetchSoldTickets() {
      try {
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

        const formattedDate = thirtyDaysAgo.toISOString().split('T')[0];

        const response = await fetch(
          `${apiUrl}/api/reservations?startDate=${formattedDate}`
        );
        if (!response.ok) {
          throw new Error('Failed to fetch sold tickets');
        }

        const data = await response.json();

        const totalSoldTickets = data.reduce((acc, reservation) => {
          const reservationDate = new Date(reservation.createdAt);
          if (!isNaN(reservationDate) && reservationDate >= thirtyDaysAgo) {
            const selectedSeatsCount = reservation.selectedSeats
              ? reservation.selectedSeats.length
              : 0;
            return acc + selectedSeatsCount;
          }
          return acc;
        }, 0);

        setSoldTickets(totalSoldTickets);
      } catch (error) {
        console.error('Error fetching sold tickets:', error);
      }
    }

    fetchSoldTickets();
  }, [apiUrl]);

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

        const reviewsWithUserDetails = await Promise.all(
          last30DaysReviews.map(async (review) => {
            const [userResponse, movieResponse] = await Promise.all([
              fetch(`${apiUrl}/api/users/${review.user}`),
              fetch(`${apiUrl}/api/movies/${review.movie}`),
            ]);

            if (!userResponse.ok || !movieResponse.ok) {
              throw new Error('Failed to fetch user or movie details');
            }

            const userData = await userResponse.json();
            const movieData = await movieResponse.json();

            return {
              ...review,
              userDisplayName: userData.displayName,
              movieTitle: movieData.title,
            };
          })
        );

        const sortedReviews = reviewsWithUserDetails.sort(
          (a, b) => new Date(b.dateAdded) - new Date(a.dateAdded)
        );

        const topFiveReviews = sortedReviews.slice(0, 5);
        const reviewsWithFormattedDates = topFiveReviews.map((review) => ({
          ...review,
          dateAdded: format(new Date(review.dateAdded), 'dd/MM/yyyy'),
        }));

        setLatestReviews(reviewsWithFormattedDates);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    }
    fetchReviews();
  }, [apiUrl]);

  useEffect(() => {
    async function fetchTopRatedMovies() {
      try {
        const response = await fetch(`${apiUrl}/api/movies/ratings/all`);
        if (!response.ok) {
          throw new Error('Failed to fetch top-rated movies');
        }
        const data = await response.json();

        const movieRatingsMap = new Map();

        data.forEach((movieRating) => {
          const movieId = movieRating.movie;

          if (!movieRatingsMap.has(movieId)) {
            movieRatingsMap.set(movieId, {
              totalRating: movieRating.rating,
              numberOfRatings: 1,
            });
          } else {
            const currentTotalRating = movieRatingsMap.get(movieId).totalRating;
            const currentNumberOfRatings =
              movieRatingsMap.get(movieId).numberOfRatings;

            const newRating = movieRating.rating;

            movieRatingsMap.set(movieId, {
              totalRating: currentTotalRating + newRating,
              numberOfRatings: currentNumberOfRatings + 1,
            });
          }
        });

        const sortedMoviesWithAverageRating = Array.from(
          movieRatingsMap.entries()
        )
          .map(([movieId, { totalRating, numberOfRatings }]) => ({
            movieId,
            averageRating: totalRating / numberOfRatings,
          }))
          .sort((a, b) => b.averageRating - a.averageRating);

        const topFiveMoviesWithAverageRating =
          sortedMoviesWithAverageRating.slice(0, 5);

        const moviesWithAverageRating = await Promise.all(
          topFiveMoviesWithAverageRating.map(
            async ({ movieId, averageRating }) => {
              const response = await fetch(`${apiUrl}/api/movies/${movieId}`);
              if (!response.ok) {
                throw new Error('Failed to fetch movie details');
              }
              const movieData = await response.json();

              const formattedAverageRating = parseFloat(
                averageRating.toFixed(1)
              );

              return {
                ...movieData,
                averageRating: formattedAverageRating,
              };
            }
          )
        );

        setTopRatedMovies(moviesWithAverageRating);
      } catch (error) {
        console.error('Error fetching top-rated movies:', error);
      }
    }

    fetchTopRatedMovies();
  }, [apiUrl]);

  return (
    <>
      <div className="dashboard">
        <div className="dashboard__container">
          <h2>Dashboard</h2>
          <div className="dashboard__stats">
            <DashboardStat
              title="Sprzedanych biletów"
              subtitle="Ostatnie 30 dni"
              value={soldTickets}
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
              data={latestReviews}
              columns={lastReviewColumns}
            />

            <DashboardCard
              title="Najlepsze filmy"
              buttonText="Wszystkie"
              data={topRatedMovies}
              columns={topMovieColumns}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardView;
