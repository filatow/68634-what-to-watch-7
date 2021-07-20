import React from 'react';
import reviewProp from './review.prop';

function Review({review}) {
  const {
    user,
    date,
    comment,
    rating,
  } = review;

  const reviewDate = new Date(date).toLocaleDateString(
    'en-US',
    { month: 'long', day: 'numeric', year: 'numeric'});

  return (
    <div className="review">
      <blockquote className="review__quote">
        <p className="review__text">
          {comment}
        </p>

        <footer className="review__details">
          <cite className="review__author">{user.name}</cite>
          <time className="review__date" dateTime={date}>
            {reviewDate}
          </time>
        </footer>
      </blockquote>

      <div className="review__rating">{rating}</div>
    </div>
  );
}

Review.propTypes = {
  review: reviewProp,
};

export default Review;

