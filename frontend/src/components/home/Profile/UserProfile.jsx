import React, { useState, useEffect } from 'react';
import { useAuth } from '../Auth/AuthContext';
import { format } from 'date-fns';
import UserProfileStats from './UserProfileStats';
import UserProfileCard from './UserProfileCard';
import '../../../Styles/layout/_UserProfile.scss';
import { Navigate } from 'react-router-dom';

const UserProfile = () => {
  const auth = useAuth();
  const [ratingsCount, setRatingsCount] = useState(0);
  const [reviewsCount, setReviewsCount] = useState(0);
  const [selectedSeatsCount, setSelectedSeatsCount] = useState(0);
  const [transactionsCount, setTransactionsCount] = useState(0);
  const [selectedSeatsData, setSelectedSeatsData] = useState([]);
  const [transactionsData, setTransactionsData] = useState([]);

  useEffect(() => {
    document.title = `CinemaModern - Profil Użytkownika`;
  }, []);

  const getRatingsCount = async (userId) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/movies/${userId}/ratings/count`
      );
      const data = await response.json();
      return data.count;
    } catch (error) {
      console.error('Error fetching ratings count:', error);
      throw new Error('Internal server error');
    }
  };

  const getReviewsCount = async (userId) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/movies/${userId}/reviews/count`
      );
      const data = await response.json();
      return data.count;
    } catch (error) {
      console.error('Error fetching reviews count:', error);
      throw new Error('Internal server error');
    }
  };

  const getSelectedSeatsCount = async (userId) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/reservations/${userId}/selectedSeats/count`
      );
      const data = await response.json();
      return data.count;
    } catch (error) {
      console.error('Error fetching selected seats count:', error);
      throw new Error('Internal server error');
    }
  };

  const getTransactionsCount = async (userId) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/reservations/${userId}/transactions/count`
      );
      const data = await response.json();
      return data.count;
    } catch (error) {
      console.error('Error fetching transactions count:', error);
      throw new Error('Internal server error');
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (auth.user) {
        try {
          const fetchedRatingsCount = await getRatingsCount(auth.user._id);
          const fetchedReviewsCount = await getReviewsCount(auth.user._id);
          const fetchedSelectedSeatsCount = await getSelectedSeatsCount(
            auth.user._id
          );
          const fetchedTransactionsCount = await getTransactionsCount(
            auth.user._id
          );

          setRatingsCount(fetchedRatingsCount);
          setReviewsCount(fetchedReviewsCount);
          setSelectedSeatsCount(fetchedSelectedSeatsCount);
          setTransactionsCount(fetchedTransactionsCount);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
    };

    fetchData();
  }, [auth.user]);

  useEffect(() => {
    const fetchData = async () => {
      if (auth.user) {
        try {
          const fetchedRatingsCount = await getRatingsCount(auth.user._id);
          const fetchedReviewsCount = await getReviewsCount(auth.user._id);
          const fetchedSelectedSeatsCount = await getSelectedSeatsCount(
            auth.user._id
          );
          const fetchedTransactionsCount = await getTransactionsCount(
            auth.user._id
          );

          setRatingsCount(fetchedRatingsCount);
          setReviewsCount(fetchedReviewsCount);
          setSelectedSeatsCount(fetchedSelectedSeatsCount);
          setTransactionsCount(fetchedTransactionsCount);

          const selectedSeatsResponse = await fetch(
            `${process.env.REACT_APP_API_URL}/api/reservations/${auth.user._id}/selectedSeats`
          );

          const selectedSeatsData = await selectedSeatsResponse.json();

          const formattedSelectedSeatsData = selectedSeatsData.map((seat) => ({
            ...seat,
            createdAt: format(new Date(seat.createdAt), 'M/d/yyyy'),
          }));

          setSelectedSeatsData(formattedSelectedSeatsData);

          const transactionsResponse = await fetch(
            `${process.env.REACT_APP_API_URL}/api/reservations/${auth.user._id}/transactions`
          );
          const transactionsData = await transactionsResponse.json();

          const formattedTransactionsData = transactionsData.map(
            (transaction) => ({
              ...transaction,
              createdAt: format(new Date(transaction.createdAt), 'M/d/yyyy'),
            })
          );

          setTransactionsData(formattedTransactionsData);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
    };

    fetchData();
  }, [auth.user]);

  return (
    <div className="user-profile">
      <div className="user-profile__container">
        <h2>Profil użytkownika</h2>
        {auth.user ? (
          <div>
            <div className="user-profile__profile">
              <img src={auth.user.picture} alt="Avatar profilowy" />
              <div className="user-profile__profile--data">
                <p className="user-profile__profile--name">
                  {auth.user.displayName}
                </p>
                <p>{auth.user.email}</p>
              </div>
            </div>

            <div className="user-profile__stats">
              <UserProfileStats
                title="Zakupione bilety"
                subtitle="od początku"
                value={selectedSeatsCount}
              />

              <UserProfileStats
                title="Wystawione oceny"
                subtitle="od początku"
                value={ratingsCount}
              />

              <UserProfileStats
                title="Napisane recenzje"
                subtitle="od początku"
                value={reviewsCount}
              />

              <UserProfileStats
                title="Liczba transakcji"
                subtitle="od początku"
                value={transactionsCount}
              />
            </div>

            <div className="user-profile__cards">
              <UserProfileCard
                title="Zakupione bilety"
                buttonText="Wszystkie"
                data={selectedSeatsData.slice(0, 5)}
                columns={[
                  { label: 'Film', value: 'movieTitle' },
                  { label: 'Cena', value: 'ticketPrice' },
                  { label: 'Data zakupu', value: 'createdAt' },
                ]}
              />

              <UserProfileCard
                title="Transakcje"
                buttonText="Wszystkie"
                data={transactionsData.slice(0, 5)}
                columns={[
                  { label: 'Film', value: 'movieTitle' },
                  { label: 'Cena', value: 'totalPrice' },
                  { label: 'Data zakupu', value: 'createdAt' },
                ]}
              />
            </div>
          </div>
        ) : (
          <Navigate to="/brak-dostepu" />
        )}
      </div>
    </div>
  );
};

export default UserProfile;
