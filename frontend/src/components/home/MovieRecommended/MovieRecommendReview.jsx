import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { format } from 'date-fns';
import '../../../Styles/components/_MovieRecommendReview.scss';
import avatar from '../../../assets/images/avatar.png';
import { useAuth } from '../Auth/AuthContext';

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

  useEffect(() => {
    if (user) {
      fetchReviews(id, setReviews);
    }
  }, [id, user]);

  useEffect(() => {
    fetchReviews(id, setReviews);
  }, [id, user]);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();

    // Sprawdź, czy użytkownik jest zalogowany
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
          },
          body: JSON.stringify({
            comment: userReview,
            dateTime: getCurrentDateTime(),
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
                    <img src={avatar} alt="profilowe zdjecie" />
                  </div>
                  <div>
                    <h4>Jan Kowalski</h4>
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
