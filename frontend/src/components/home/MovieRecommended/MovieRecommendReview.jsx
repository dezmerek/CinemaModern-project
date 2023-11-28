import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { format } from 'date-fns';

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

  useEffect(() => {
    fetchReviews(id, setReviews);
  }, [id]);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();

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

  return (
    <div className="movie-review-form">
      <h2>Recenzje</h2>
      <form onSubmit={handleReviewSubmit}>
        <textarea
          value={userReview}
          onChange={(e) => setUserReview(e.target.value)}
          placeholder="Dodaj recenzję..."
        />
        <button type="submit">Dodaj recenzję</button>
      </form>

      {reviews.length > 0 && (
        <div className="reviews-list">
          <h3>Wszystkie recenzje:</h3>
          <ul>
            {reviews.map((review) => (
              <li key={review._id || review.comment}>
                <p>{format(new Date(review.dateAdded), 'dd.MM.yyyy, HH:mm')}</p>
                <p>{review.comment}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default MovieReviewForm;
