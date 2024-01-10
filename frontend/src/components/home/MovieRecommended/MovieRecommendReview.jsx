import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { format } from 'date-fns';
import '../../../Styles/components/_MovieRecommendReview.scss';
import { useAuth } from '../Auth/AuthContext';
import avatar from '../../../assets/images/avatar.png';

const fetchReviews = async (id, setReviews) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/api/movies/${id}/reviews`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch reviews');
    }

    const reviewsData = await response.json();
    setReviews(reviewsData);
  } catch (error) {
    console.error('Error fetching reviews:', error);
  }
};

const getCurrentDateTime = () => {
  const currentDateTime = new Date();
  const formattedDateTime = `${currentDateTime.toLocaleDateString()} ${currentDateTime.toLocaleTimeString()}`;
  return formattedDateTime;
};

const MovieReviewForm = () => {
  const { id } = useParams();
  const [userReview, setUserReview] = useState('');
  const [reviews, setReviews] = useState([]);
  const { user } = useAuth();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (user) {
      fetchReviews(id, setReviews);
      fetchUsers();
    }
  }, [id, user]);

  useEffect(() => {
    fetchReviews(id, setReviews);
    fetchUsers();
  }, [id, user]);

  const fetchUsers = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/users`
      );
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      const userData = await response.json();
      setUsers(userData);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const getUsernameById = (userId) => {
    const user = users.find((u) => u._id === userId);
    return user ? user.displayName : 'Nieznany użytkownik';
  };

  const getAvatarById = (userId) => {
    const user = users.find((u) => u._id === userId);
    return user ? user.picture : avatar;
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      alert('Musisz być zalogowany, aby dodać recenzję');
      return;
    }

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/movies/${id}/reviews`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user.token}`,
          },
          body: JSON.stringify({
            comment: userReview,
            dateTime: getCurrentDateTime(),
            userId: user._id,
          }),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to submit review');
      }

      fetchReviews(id, setReviews);

      setUserReview('');
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

  const handleReset = () => {
    setUserReview('');
  };

  return (
    <div className="review">
      <h2>Recenzje</h2>

      {reviews.length > 0 && (
        <div className="review__container">
          <ul>
            {reviews.map((review) => (
              <li key={review._id || review.comment}>
                <div className="review__content">
                  <div>
                    <img
                      src={getAvatarById(review.user)}
                      alt="profilowe zdjecie"
                    />
                  </div>
                  <div>
                    <h4>{getUsernameById(review.user)}</h4>
                    <p>
                      {format(new Date(review.dateAdded), 'dd.MM.yyyy, HH:mm')}
                    </p>
                  </div>
                </div>
                <hr />
                <p className="review__container--comment">{review.comment}</p>
              </li>
            ))}
          </ul>
        </div>
      )}

      {user && (
        <form className="review__form" onSubmit={handleReviewSubmit}>
          <textarea
            value={userReview}
            onChange={(e) => setUserReview(e.target.value)}
            placeholder="Dodaj recenzję..."
          />
          <div>
            <button type="submit">Dodaj</button>
            <button type="button" onClick={handleReset}>
              Wyczyść
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default MovieReviewForm;
